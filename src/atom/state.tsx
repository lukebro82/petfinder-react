import { create } from "zustand";
import { persist } from "zustand/middleware";

const apiBaseUrl = "https://pet-finder-osj6.onrender.com";

interface PetsNear {
  pets: [];
  loading: boolean;
  error: string | null;
  fetchPetsNear: (last_lat: any, last_lng: any) => Promise<void>;
}

export const usePetsNears = create<PetsNear>((set) => ({
  pets: [],
  loading: false,
  error: null,
  fetchPetsNear: async (last_lat, last_lng) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        apiBaseUrl +
          "/pets/cerca?" +
          "last_lat=" +
          last_lat +
          "&" +
          "last_lng=" +
          last_lng,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();

      set({ pets: data.message, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

interface AuthState {
  name: string;
  email: string;
  password: any;
  token: string;
  location: string;
  fetchAuth: (name: string, email: string, password: any) => Promise<void>;
  fetchLogin: (email: string, password: any) => Promise<void>;
  closeSession: () => void;
  patchUser: (name: string, location: string) => Promise<void>;
}

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      password: "",
      token: "",
      location: "",
      fetchAuth: async (name: string, email: string, password: any) => {
        return fetch(apiBaseUrl + "/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }).then((res) => {
          return res.json();
        });
      },
      fetchLogin: async (email: string, password: any) => {
        return fetch(apiBaseUrl + "/auth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              set({ token: data.token, email: email });
            }
            return data;
          });
      },
      closeSession: () => {
        set({ token: "", email: "", name: "", password: "" });
      },
      patchUser: async (name: string, location: string): Promise<any> => {
        return fetch(apiBaseUrl + "/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthState.getState().token}`,
          },
          body: JSON.stringify({
            name,
            location,
          }),
        }).then((res) => res.json());
      },
      newPass: async (email: string, password: any): Promise<any> => {
        return fetch(apiBaseUrl + "/auth", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthState.getState().token}`,
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }).then((res) => res.json());
      },
    }),
    {
      name: "auth-storage", // nombre en localStorage
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        name: state.name,
        location: state.location,
      }), // solo guarda lo necesario
    }
  )
);

interface ReportPet {
  fetchReportPet: (
    name: string,
    photo: string,
    last_lat: any,
    last_lng: any,
    lastLocation: any
  ) => Promise<void>;
  fetchMyPets: () => Promise<void>;
  MyPets: any[];
}

export const useReportPet = create<ReportPet>((set) => ({
  MyPets: [],
  fetchReportPet: async (
    name: string,
    photo: string,
    last_lat: any,
    last_lng: any,
    lastLocation: any
  ) => {
    return fetch(apiBaseUrl + "/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthState.getState().token}`,
      },
      body: JSON.stringify({
        name: name,
        photo: photo,
        last_lat: last_lat,
        last_lng: last_lng,
        lastLocation: lastLocation,
      }),
    }).then((res) => {
      return res.json();
    });
  },
  fetchMyPets: async () => {
    return fetch(apiBaseUrl + "/pets/mios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthState.getState().token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        set({ MyPets: res.message });
      });
  },
}));

interface PetToEdit {
  id: any;
  name: any;
  photo: any;
  lat: any;
  lng: any;
  location: any;
  setPetId: (id: any) => void;
  setPetPhoto: (photo: any) => void;
  updatePet: (pet: any) => Promise<any>;
  deletePet: (petid: any, photoURL: any) => Promise<any>;
}

export const usePetToEdit = create<PetToEdit>((set) => ({
  id: "",
  name: "",
  photo: "",
  lat: "",
  lng: "",
  location: "",
  setPetId: (id) => {
    set({ id });
  },
  setPetPhoto: (photo) => {
    set({ photo });
  },
  updatePet: (pet) => {
    return fetch(apiBaseUrl + "/pet", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthState.getState().token}`,
      },
      body: JSON.stringify({
        id: pet.id,
        name: pet.name,
        photo: pet.photo,
        lat: pet.lat,
        lng: pet.lng,
        location: pet.location,
      }),
    }).then((res) => {
      return res.json();
    });
  },
  deletePet: (petid, photoURL) => {
    return fetch(apiBaseUrl + "/pet", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthState.getState().token}`,
      },
      body: JSON.stringify({
        id: petid,
        photoURL: photoURL,
      }),
    }).then((res) => {
      return res.json();
    });
  },
}));

interface MailState {
  senMail: (
    petid: string,
    message: string,
    from: any,
    tel: any
  ) => Promise<void>;
}

export const useMailState = create<MailState>(() => ({
  senMail: async (petid: string, message: string, from: any, tel: any) => {
    return fetch(apiBaseUrl + "/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petid,
        message,
        from,
        tel,
      }),
    }).then((res) => {
      return res.json();
    });
  },
}));
