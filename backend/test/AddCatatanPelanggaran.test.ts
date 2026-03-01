import { AddManyCatatanPelanggaranSchema } from "../validation/CatatanPelanggaranSchema";


describe("AddManyCatatanPelanggaranSchema", () => {
  const validData = {
    idPelanggaran: 1,
    idPelanggar: [1, 2, 3],
    idPencatat: 5,
    idKelasPelanggar: 2,
    bukti: "foto.jpg",
    semester: "ganjil",
    time: "2026-02-27",
    tahun_ajaran: "2025-2026",
  };
  
  it("should pass with valid data", () => {
    const result = AddManyCatatanPelanggaranSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
  
  it("should fail if idPelanggaran is missing", () => {
    const { idPelanggaran, ...data } = validData;

    const result = AddManyCatatanPelanggaranSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
  
  it("should fail if idPelanggaran is string", () => {
    const result = AddManyCatatanPelanggaranSchema.safeParse({
      ...validData,
      idPelanggaran: "1",
    });

    expect(result.success).toBe(false);
  });

  
  it("should fail if idPelanggar is empty array", () => {
    const result = AddManyCatatanPelanggaranSchema.safeParse({
      ...validData,
      idPelanggar: [],
    });

    expect(result.success).toBe(false);
  });

  it("should fail if semester is invalid", () => {
    const result = AddManyCatatanPelanggaranSchema.safeParse({
      ...validData,
      semester: "semester3",
    });

    expect(result.success).toBe(false);
  });
  
  it("should fail if time is invalid date format", () => {
    const result = AddManyCatatanPelanggaranSchema.safeParse({
      ...validData,
      time: "27-02-2026",
    });

    expect(result.success).toBe(false);
  });
  
  it("should fail if tahun_ajaran format is wrong", () => {
    const result = AddManyCatatanPelanggaranSchema.safeParse({
      ...validData,
      tahun_ajaran: "2025/2026",
    });

    expect(result.success).toBe(false);
  });
});