export const ROLES = {
  ADMIN: "admin",
  KESISWAAN: "kesiswaan",
  BK: "bk",
  KEPSEK: "kepsek",
  SISWA: "siswa",
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export interface Profile {
  id: number;
  name: string;
  role: UserRole;
  image_profile?: string;
}

export interface Kelas {
  id: number;
  name: string;
  grade: string;
}

export interface Siswa {
  id: number;
  nisn: string;
  poin: number;
  kelasId: number;
  profileSiswa: Profile;
  kelas: Kelas;
}

export interface Tendik {
  id: number;
  nip: string;
  profileSiswa: Profile;
}

export interface Semester {
  id: number;
  semester: 'ganjil' | 'genap';
  tahun_ajaran: string;
  is_active: boolean;
}

export interface JenisPelanggaran {
  id: number;
  jenis_pelanggaran: string;
}

export interface Pelanggaran {
  id: number;
  nomor: string;
  pelanggaran: string;
  poin: number;
  jenisId: number;
}
