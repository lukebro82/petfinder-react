import { useEffect, useRef, useState } from "react";
import { ButtonEl } from "../../ui/ButtonEl";
import css from "./index.module.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { useAuthState, useReportPet } from "../../atom/state";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXplcXVpZWw5MyIsImEiOiJja3U0aTAyc2gwaGg1MnBvNmhyemJzbDc2In0.VfvIXjWgL8_dqs1ZKlQorA";

const initialReport = {
  name: "",
  photo: "",
  lat: 0,
  lng: 0,
  location: "",
};

export const ReportPet = () => {
  const navigate = useNavigate();
  const token = useAuthState((state) => state.token);
  const { fetchReportPet } = useReportPet();
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null); // usar useRef para el marker
  const [resReport, setResReport] = useState(initialReport);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login"); // o la ruta que tengas para login
    }
  }, [token]);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-58.381775, -34.603851],
        zoom: 8,
        maxBounds: [
          [-75, -55],
          [-53, -20],
        ],
      });

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        setResReport((prev) => ({ ...prev, lat, lng }));

        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
        }
      });

      mapRef.current = map;
    }
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setResReport((prev) => ({ ...prev, photo: base64 }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.q as HTMLInputElement).value;

    if (!query) return;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}&country=AR`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      const location = data.features[0].place_name;

      setResReport((prev) => ({
        ...prev,
        lat,
        lng,
        location,
      }));

      if (mapRef.current) {
        mapRef.current.flyTo({ center: [lng, lat], zoom: 15 });

        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No se encontró la ubicación",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, photo, location, lat, lng } = resReport;

    if (!name || !photo || !location) {
      Swal.fire({
        icon: "error",
        title: "Faltan datos",
        confirmButtonColor: "#9CBBE9",
      });
      return;
    }

    try {
      await fetchReportPet(name, photo, lat, lng, location);
      Swal.fire({
        icon: "success",
        title: "Reporte enviado correctamente",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al enviar el reporte",
      });
      console.error(err);
    }
  };

  return (
    <div className={css.homepagepetreport}>
      <h1 className={css.formh1}>Reportar mascota</h1>
      <h3 className={css.formh3}>
        Ingresá la siguiente información para <br /> realizar el reporte de la
        mascota
      </h3>

      {/* FORM PRINCIPAL CON ID */}
      <form id="reportForm" className={css.formname} onSubmit={handleSubmit}>
        <div className={css.divlabelinput}>
          <label className={css.registrolabel}>NOMBRE</label>
          <input
            className={css.registroinput}
            name="name"
            type="text"
            value={resReport.name}
            onChange={(e) =>
              setResReport((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className={css.divdropzone}>
          <label className={css.registrolabel}>Cargar la Imagen</label>
          <div {...getRootProps()} className={css.ropzone}>
            <input {...getInputProps()} />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <p>Arrastrá o hacé clic para subir</p>
            )}
          </div>
        </div>
      </form>

      {/* FORM DE BUSQUEDA */}
      <form className={css.searchform} onSubmit={handleSearch}>
        <label>Buscar por ubicación (Ciudad, Provincia)</label>
        <input className={css.registroinput} name="q" type="search" />
        <ButtonEl buttonColor="#00A884" type="submit" className={css.buscarubi}>
          Buscar
        </ButtonEl>
        <label>Seleccionar un punto en el mapa</label>
        <div
          className={css.map}
          ref={mapContainerRef}
          style={{ width: "300px", height: "200px" }}
        />
      </form>

      {/* BOTÓN QUE DISPARA EL FORM POR ID */}
      <ButtonEl
        id="button1"
        form="reportForm"
        buttonColor="#00A884"
        className={css.formbutton}
        type="submit"
        handleClick={handleSubmit}
      >
        Reportar mascota
      </ButtonEl>

      <ButtonEl
        id="button2"
        buttonColor="#4A5553"
        className={css.formbutton}
        onClick={() => navigate("/")}
      >
        Cancelar
      </ButtonEl>
    </div>
  );
};
