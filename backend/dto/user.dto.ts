export interface CreateSiswaDTO {
  name: string;
  password: string;
  role: string
  kelasId: number;
  nisn: string;
  image_profile?: string | null;
  poin: number;
}

export interface CreateTendikDTO {
  name: string;
  password: string;
  role: string
  nip: string;
  image_profile?: string | null;
}

export interface LoginDTO {
  nomor_induk: string;
  password: string;
  platform: string;
}

export interface CreateKelasDTO {
  grade: number;
  name: string;
}

export interface CreateManyKelasDTO {
  kelas: {
    grade: number;
    name: string;
  }[]
}

export interface UpdateUserDTO {
  name: string;
  kelasId: number;
  nisn: string;
}

export interface UpdateManySiswaKelasDTO {
  kelasUpdate: {
    siswaIds: string;
    kelasIds: string;
  }[];
}

export interface UpdateTendikDTO {
  name: string;
  image_profile: string | null;
}