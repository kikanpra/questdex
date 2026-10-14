import React, { useState } from "react";
import { QuestPack, Question, QuestionType } from "../types";
import { Eye, Plus, Save, CheckCircle2, Edit3 } from "lucide-react";
import { sound } from "../utils/audio";
import group303Image from "../assets/images/Group 303.png";

interface LecturerPackStudioProps {
  packs: QuestPack[];
  onSavePack: (pack: QuestPack) => void;
  onClose: () => void;
}

export const LecturerPackStudio: React.FC<LecturerPackStudioProps> = ({
  packs,
  onSavePack,
}) => {
  const [selectedPackId, setSelectedPackId] = useState<string>(
    packs[0]?.id || "new",
  );
  const [activeSubTab, setActiveSubTab] = useState<"editor" | "preview">(
    "editor",
  );

  const currentPack = packs.find((p) => p.id === selectedPackId) || {
    id: `pack-${Date.now()}`,
    title: "Python Data Science Pack",
    course: "Kecerdasan Buatan & Data",
    meetingNumber: 8,
    meetingCode: "Pertemuan 08",
    topic: "Pandas & NumPy Matrix Computations",
    cardCount: 10,
    timeLimitMinutes: 20,
    coverImage: group303Image,
    assignedClass: "IF-2024-A",
    isPublished: true,
    accentColor: "#DBEE00",
    description:
      "Eksplorasi manipulasi data tabular, vektorisasi komputasi, dan agregasi data statistik dengan Python.",
    questions: Array.from({ length: 10 }).map((_, i) => ({
      id: `q-custom-${i + 1}`,
      cardIndex: i + 1,
      topic: `Topik ${i + 1}`,
      prompt: `Pertanyaan evaluasi konsep untuk kartu ${i + 1}?`,
      type: "multiple-choice" as QuestionType,
      options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      correctAnswer: "Pilihan A",
      explanation: "Penjelasan akademik untuk jawaban benar.",
    })),
  };

  const [formData, setFormData] = useState<QuestPack>(currentPack);
  const [savedToast, setSavedToast] = useState(false);
  const [previewQuestionIndex, setPreviewQuestionIndex] = useState(1);

  const handleSelectPack = (id: string) => {
    sound.playSelect();
    setSelectedPackId(id);
    const found = packs.find((p) => p.id === id);
    if (found) {
      setFormData(found);
    }
  };

  const handleCreateNew = () => {
    sound.playSelect();
    const newPack: QuestPack = {
      id: `pack-${Date.now()}`,
      title: "Pack Kuis Baru",
      course: "Pemrograman Web",
      meetingNumber: packs.length + 1,
      meetingCode: `Pertemuan ${String(packs.length + 1).padStart(2, "0")}`,
      topic: "Topik Bahasan Baru",
      cardCount: 10,
      timeLimitMinutes: 20,
      coverImage: group303Image,
      assignedClass: "IF-2024-A",
      isPublished: true,
      accentColor: "#DBEE00",
      description:
        "Deskripsi kompetensi dan tujuan pembelajaran untuk booster pack ini.",
      questions: Array.from({ length: 10 }).map((_, i) => ({
        id: `q-${Date.now()}-${i + 1}`,
        cardIndex: i + 1,
        topic: `Konsep ${i + 1}`,
        prompt: `Pertanyaan nomor ${i + 1} untuk mahasiswa:`,
        type: "multiple-choice" as QuestionType,
        options: ["Opsi A (Benar)", "Opsi B", "Opsi C", "Opsi D"],
        correctAnswer: "Opsi A (Benar)",
        explanation: "Penjelasan materi terkait.",
      })),
    };
    setSelectedPackId(newPack.id);
    setFormData(newPack);
  };

  const handleSave = () => {
    sound.playRewardFanfare("RARE");
    const packToSave = { ...formData, coverImage: group303Image };
    setFormData(packToSave);
    onSavePack(packToSave);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const updateQuestion = (index: number, patch: Partial<Question>) => {
    const updated = [...formData.questions];
    updated[index] = { ...updated[index], ...patch };
    setFormData({ ...formData, questions: updated });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-fade-in text-[#F5F7FA] bg-[#1D3F6D]">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2b558c]">
        <div>
          <span className="text-xs font-mono font-black text-[#DBEE00] tracking-wider uppercase">
            PANEL DOSEN & PENGELOLA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#F5F7FA]">
            Studio Booster Pack Dosen
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Konfigurasi materi, 10 kartu soal kuis, kunci jawaban, dan pratinjau
            booster pack sebelum dipublikasikan ke mahasiswa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#142e52] p-1 rounded-2xl border border-[#2b558c]">
            <button
              onClick={() => {
                sound.playSelect();
                setActiveSubTab("editor");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === "editor"
                  ? "bg-[#DBEE00] text-black shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              Editor Pack
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setActiveSubTab("preview");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === "preview"
                  ? "bg-[#DBEE00] text-black shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              Live Preview
            </button>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-2xl bg-[#DBEE00] hover:bg-[#c6d700] text-black text-xs font-black font-['Outfit'] flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan & Publikasikan
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-[#DBEE00]/20 border border-[#DBEE00] text-[#DBEE00] rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Booster pack berhasil disimpan dan diperbarui di katalog mahasiswa!
        </div>
      )}

      {/* Pack Selector Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs text-white/80 font-bold shrink-0 mr-1">
          Pilih Pack:
        </span>
        {packs.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPack(p.id)}
            className={`px-3.5 py-1.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedPackId === p.id
                ? "bg-[#DBEE00] border-black text-black shadow"
                : "bg-[#142e52] border-[#2b558c] text-[#F5F7FA] hover:text-[#DBEE00]"
            }`}
          >
            {p.title} ({p.meetingCode})
          </button>
        ))}
        <button
          onClick={handleCreateNew}
          className="px-3.5 py-1.5 rounded-2xl border-2 border-dashed border-[#DBEE00] hover:bg-[#DBEE00]/10 text-xs font-bold text-[#DBEE00] flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          Buat Pack Baru
        </button>
      </div>

      {activeSubTab === "editor" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Pack Metadata & Visual Preview Card */}
          <div className="lg:col-span-5 bg-[#142e52] border border-[#2b558c] rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wide text-[#DBEE00] font-['Outfit']">
              IDENTITAS & SAMPUL BOOSTER PACK
            </h3>

            {/* Live Booster Pack Cover (Original Booster Pack Image) */}
            <div className="relative w-[210px] h-[300px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DBEE00]">
              <img
                src={group303Image}
                alt={formData.title}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 holo-sheen opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#10243E] via-[#10243E]/80 to-transparent">
                <span className="text-[10px] font-mono uppercase text-[#DBEE00] block font-bold">
                  {formData.meetingCode} · 10 KARTU
                </span>
                <span className="text-xs font-bold text-white block truncate">
                  {formData.title}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 font-bold mb-1">
                  Judul Pack:
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-3 py-2 text-[#F5F7FA] focus:border-[#DBEE00] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-bold mb-1">
                    Mata Kuliah:
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-3 py-2 text-[#F5F7FA] focus:border-[#DBEE00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1">
                    Nomor Pertemuan:
                  </label>
                  <input
                    type="number"
                    value={formData.meetingNumber}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      setFormData({
                        ...formData,
                        meetingNumber: num,
                        meetingCode: `Pertemuan ${String(num).padStart(2, "0")}`,
                      });
                    }}
                    className="w-full bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-3 py-2 text-[#F5F7FA] focus:border-[#DBEE00] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  Topik Bahasan:
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-3 py-2 text-[#F5F7FA] focus:border-[#DBEE00] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-bold mb-1">
                    Target Kelas:
                  </label>
                  <input
                    type="text"
                    value={formData.assignedClass}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedClass: e.target.value,
                      })
                    }
                    className="w-full bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-3 py-2 text-[#F5F7FA] focus:border-[#DBEE00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1">
                    Batas Waktu (Menit):
                  </label>
                  <input
                    type="number"
                    value={formData.timeLimitMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeLimitMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-3 py-2 text-[#F5F7FA] focus:border-[#DBEE00] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-status"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="rounded border-[#2b558c] text-[#DBEE00] focus:ring-[#DBEE00] w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="pub-status"
                  className="text-xs text-[#F5F7FA] font-bold cursor-pointer"
                >
                  Publikasikan ke Mahasiswa (Aktif di Carousel Mahasiswa)
                </label>
              </div>
            </div>
          </div>

          {/* Right: 10 Questions Form */}
          <div className="lg:col-span-7 bg-[#142e52] border border-[#2b558c] rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2b558c]">
              <h3 className="text-sm font-black uppercase tracking-wide text-[#DBEE00] font-['Outfit']">
                DAFTAR 10 KARTU SOAL
              </h3>
              <span className="text-xs font-mono text-white/70 font-bold">
                {formData.questions.length} / 10 Soal Lengkap
              </span>
            </div>

            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2">
              {formData.questions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-2xl border border-[#2b558c] bg-[#1D3F6D] space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-[#DBEE00]">
                      KARTU {String(idx + 1).padStart(2, "0")} / 10
                    </span>
                    <select
                      value={q.type}
                      onChange={(e) =>
                        updateQuestion(idx, {
                          type: e.target.value as QuestionType,
                        })
                      }
                      className="bg-[#142e52] border border-[#2b558c] rounded-xl px-2 py-1 text-[11px] text-[#F5F7FA] font-bold outline-none"
                    >
                      <option value="multiple-choice">Pilihan Ganda</option>
                      <option value="true-false">Benar / Salah</option>
                      <option value="short-answer">Isian Singkat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 font-bold mb-1">
                      Topik Kartu:
                    </label>
                    <input
                      type="text"
                      value={q.topic}
                      onChange={(e) =>
                        updateQuestion(idx, { topic: e.target.value })
                      }
                      className="w-full bg-[#142e52] border border-[#2b558c] rounded-xl px-3 py-1.5 text-[#F5F7FA] outline-none focus:border-[#DBEE00]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 font-bold mb-1">
                      Pertanyaan / Soal:
                    </label>
                    <textarea
                      rows={2}
                      value={q.prompt}
                      onChange={(e) =>
                        updateQuestion(idx, { prompt: e.target.value })
                      }
                      className="w-full bg-[#142e52] border border-[#2b558c] rounded-xl px-3 py-1.5 text-[#F5F7FA] outline-none focus:border-[#DBEE00] resize-none"
                    />
                  </div>

                  {q.type === "multiple-choice" && (
                    <div>
                      <label className="block text-white/80 font-bold mb-1">
                        Pilihan Jawaban (Pisahkan dengan koma):
                      </label>
                      <input
                        type="text"
                        value={q.options?.join(", ") || ""}
                        onChange={(e) =>
                          updateQuestion(idx, {
                            options: e.target.value
                              .split(",")
                              .map((s) => s.trim()),
                          })
                        }
                        placeholder="Opsi A, Opsi B, Opsi C, Opsi D"
                        className="w-full bg-[#142e52] border border-[#2b558c] rounded-xl px-3 py-1.5 text-[#F5F7FA] outline-none focus:border-[#DBEE00]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#DBEE00] font-black mb-1">
                        Kunci Jawaban Benar:
                      </label>
                      <input
                        type="text"
                        value={q.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(idx, { correctAnswer: e.target.value })
                        }
                        className="w-full bg-[#142e52] border-2 border-[#DBEE00]/60 rounded-xl px-3 py-1.5 text-[#DBEE00] font-bold outline-none focus:border-[#DBEE00]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-bold mb-1">
                        Penjelasan Akademik:
                      </label>
                      <input
                        type="text"
                        value={q.explanation || ""}
                        onChange={(e) =>
                          updateQuestion(idx, { explanation: e.target.value })
                        }
                        className="w-full bg-[#142e52] border border-[#2b558c] rounded-xl px-3 py-1.5 text-[#F5F7FA] outline-none focus:border-[#DBEE00]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* LIVE PREVIEW VIEW */
        <div className="bg-[#142e52] border border-[#2b558c] rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#2b558c]">
            <div>
              <span className="text-xs font-mono uppercase text-[#DBEE00] font-black">
                PRATINJAU TAMPILAN MAHASISWA
              </span>
              <h2 className="text-lg font-bold font-['Outfit']">
                {formData.title} #
                {String(formData.meetingNumber).padStart(2, "0")}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/80 font-bold">
                Pilih Kartu:
              </span>
              <select
                value={previewQuestionIndex}
                onChange={(e) =>
                  setPreviewQuestionIndex(Number(e.target.value))
                }
                className="bg-[#1D3F6D] border border-[#2b558c] rounded-xl px-2 py-1 text-xs text-[#F5F7FA] outline-none font-bold"
              >
                {formData.questions.map((q) => (
                  <option key={q.cardIndex} value={q.cardIndex}>
                    Kartu {q.cardIndex} ({q.topic})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto py-4">
            {/* Preview Question Card with Group 303 Image Background */}
            <div className="relative w-full max-w-[340px] mx-auto min-h-[440px] border-4 border-[#1D3F6D] rounded-3xl p-6 shadow-2xl flex flex-col justify-between text-[#1D3F6D] overflow-hidden">
              <img
                src={group303Image}
                alt="Card Background"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="relative z-10 flex justify-between items-center border-b-2 border-[#1D3F6D]/30 pb-2">
                <span className="text-xs font-mono font-black text-[#1D3F6D] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#1D3F6D]/20">
                  KARTU {String(previewQuestionIndex).padStart(2, "0")} / 10
                </span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#1D3F6D] text-[#DBEE00] font-bold">
                  {formData.questions[previewQuestionIndex - 1]?.type}
                </span>
              </div>

              <div className="relative z-10 my-auto py-4 px-3 bg-white/40 rounded-2xl border border-[#1D3F6D]/15 backdrop-blur-xs">
                <span className="text-xs font-mono uppercase text-[#1D3F6D] block mb-2 font-black">
                  TOPIK: {formData.questions[previewQuestionIndex - 1]?.topic}
                </span>
                <p className="text-base font-black font-['Outfit'] text-[#10243E] leading-relaxed">
                  "{formData.questions[previewQuestionIndex - 1]?.prompt}"
                </p>
              </div>

              <div className="relative z-10 pt-2 border-t-2 border-[#1D3F6D]/30 text-xs font-bold text-[#1D3F6D] flex justify-between">
                <span>{formData.course}</span>
                <span className="font-mono uppercase font-black">QUESTDEX</span>
              </div>
            </div>

            {/* Answer Choices & Keys */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-[#DBEE00] font-black">
                TAMPILAN OPSI JAWABAN:
              </h4>

              {formData.questions[previewQuestionIndex - 1]?.type ===
                "multiple-choice" && (
                <div className="space-y-2">
                  {formData.questions[previewQuestionIndex - 1]?.options?.map(
                    (opt, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between ${
                          opt ===
                          formData.questions[previewQuestionIndex - 1]
                            ?.correctAnswer
                            ? "border-[#DBEE00] bg-[#DBEE00]/20 text-[#DBEE00]"
                            : "border-[#2b558c] bg-[#1D3F6D] text-white/80"
                        }`}
                      >
                        <span>{opt}</span>
                        {opt ===
                          formData.questions[previewQuestionIndex - 1]
                            ?.correctAnswer && (
                          <span className="text-[10px] font-mono font-black bg-[#DBEE00] px-2 py-0.5 rounded-full text-black">
                            KUNCI BENAR
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}

              {formData.questions[previewQuestionIndex - 1]?.type ===
                "true-false" && (
                <div className="grid grid-cols-2 gap-3">
                  {["Benar", "Salah"].map((opt) => (
                    <div
                      key={opt}
                      className={`p-4 rounded-2xl border text-center font-black text-xs ${
                        opt ===
                        formData.questions[previewQuestionIndex - 1]
                          ?.correctAnswer
                          ? "border-[#DBEE00] bg-[#DBEE00]/20 text-[#DBEE00]"
                          : "border-[#2b558c] bg-[#1D3F6D] text-white/80"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {formData.questions[previewQuestionIndex - 1]?.type ===
                "short-answer" && (
                <div className="space-y-2">
                  <div className="p-3 bg-[#1D3F6D] border border-[#2b558c] rounded-2xl text-xs text-white/70">
                    [ Kolom Input Teks Mahasiswa ]
                  </div>
                  <div className="p-3 bg-[#DBEE00]/20 border border-[#DBEE00] rounded-2xl text-xs text-[#DBEE00]">
                    <span className="font-black">Kunci Jawaban: </span>
                    {
                      formData.questions[previewQuestionIndex - 1]
                        ?.correctAnswer
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
