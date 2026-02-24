interface CreateSiswaDTO {
  name: string;
  password: string;
  role: string
  kelasId: number;
  nisn: string;
  image_profile?: string | null;
  poin: number;
}

interface CreateTendikDTO {
  name: string;
  password: string;
  role: string
  nip: string;
  image_profile?: string | null;
}

interface LoginDTO {
  nomor_induk: string;
  password: string;
}

interface CreateKelasDTO {
    grade: number; 
    name: string;
}

interface UpdateUserDTO {
    name: string;
    kelasId: number;
    image_profile: string | null;
}

interface UpdateTendikDTO {
    name: string;
    image_profile: string | null;
}