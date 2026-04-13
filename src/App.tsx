import { useState, useRef, useEffect } from "react";
import { rolesModern } from "./data/rolesModern";
import RoleDetail from "./pages/RoleDetail";

export default function App() {
const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedPhe, setSelectedPhe] = useState(null);
  const [search, setSearch] = useState("");

  const [showLore, setShowLore] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showRule, setShowRule] = useState(false);

  const [showFilter, setShowFilter] = useState(false);

  const [filterDoKho, setFilterDoKho] = useState([]);
  const [filterHoatDong, setFilterHoatDong] = useState([]);
  const [filterKyNang, setFilterKyNang] = useState([]);

  const holdTimer = useRef(null);
  const filterRef = useRef();

  const pheDescription = {
    "DÂN LÀNG":
      "Phe lương thiện và chiếm số lượng đông nhất trong Làng. Không biết mặt nhau và không thể nhắn tin riêng với nhau.\n\nNhiệm vụ: Tìm và loại bỏ toàn bộ các phe còn lại (gồm Sói & Solo).",
    SÓI: "Ẩn mình trong dân. Biết mặt và được nhắn tin riêng với nhau.\n\nNhiệm vụ: Tiêu diệt toàn bộ Dân làng để Số lượng Sói bằng số Dân làng.",
    SOLO: "Không thuộc phe nào, hoạt động độc lập và không thể bị phe Sói giết.\n\nNhiệm vụ: Tiêu diệt hết toàn bộ người chơi trong Làng.",
    KHÁC: "Giống phe Solo nhưng có thể bị phe Sói giết.\n\nNhiệm vụ: Tiêu diệt hết toàn bộ người chơi trong Làng hoặc chiến thắng theo cơ chế riêng của role.",
    "ĐẶC BIỆT":
      "Vai trò hiếm, thay đổi cục diện và xuất hiện tuỳ vào tình huống trận đấu.\n\nNhiệm vụ: Hoàn thành đúng chức năng gốc của mình và đưa ra các quyết định nhằm giữ mạch chơi.",
  };

  const roles = rolesModern;

  const pheList = ["DÂN LÀNG", "SÓI", "SOLO", "KHÁC", "ĐẶC BIỆT"];

  const title = "MA SÓI HIỆN ĐẠI LÀNG BÉO";

  const pheColor = {
    "DÂN LÀNG": "#4caf50",
    SÓI: "#f44336",
    SOLO: "#2196f3",
    KHÁC: "#ff9800",
    "ĐẶC BIỆT": "#9c27b0",
  };

  const pheIcon = {
    "DÂN LÀNG": "🌿",
    SÓI: "🐺",
    SOLO: "👤",
    KHÁC: "⚡",
    "ĐẶC BIỆT": "👑",
  };

  const [factionCard, setFactionCard] = useState(null);

  const openRoleFromDetail = (roleName: string) => {
    const clean = roleName.replace(/,/g, "").trim();

    const found = roles.find((r) => r.name.replace(/,/g, "").trim() === clean);

    if (found) setSelectedRole(found);
  };

  const doKhoList = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

  const hoatDongList = [
    "Ban đêm 🌚",
    "Ban ngày 🌝",
    "Linh hoạt (ngày + đêm) 🌗",
    "Bị động 🛑",
  ];

  const kyNangList = [
    "Hỗ trợ - Bảo kê",
    "Bền bỉ - Sống dai",
    "Lật mặt - Phản bội",
    "Giết người hàng loạt",
    "Quấy rối - Phá phách",
    "Lôi kéo - Thao túng",
    "Nhìn thấu - Soi chiếu",
    "Đột biến - Gây bất ngờ",
    "Riêng biệt - Thắng bằng cách khác",
    "Nắm quyền sinh - sát",
    "Hoạt ngôn - Nghe nói",
    "Vô tri - Đơn giản",
    "Khống chế - Khoá chức năng",
    "Phức tạp - Não to",
    "Rình rập - Chờ thời cơ",
  ];

  const changeMode = (direction) => {
    const currentIndex = modeList.indexOf(mode);

    let newIndex =
      direction === "next"
        ? (currentIndex + 1) % modeList.length
        : (currentIndex - 1 + modeList.length) % modeList.length;

    setMode(modeList[newIndex]);
    setSelectedPhe(null);
    setSelectedRole(null);
  };

  const toggleValue = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterCount =
    filterDoKho.length + filterHoatDong.length + filterKyNang.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "16px",
        paddingTop: "20px",
        paddingBottom: "40px",
        color: "white",

        backgroundImage:
          "url('https://res.cloudinary.com/dxif9j81u/image/upload/q_auto/f_auto/v1770736794/L%C3%A0ng_B%C3%A9o_zbrt0c.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.75)",
        backgroundBlendMode: "darken",
        backgroundAttachment: "fixed",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {!selectedPhe && !selectedRole && (
          <>
            <h1
              style={{
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                fontSize: "41px",
                fontWeight: "900",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "Oswald, sans-serif",
                marginBottom: "12px",

                // 🎮 màu thần bí nhẹ
                color: "#e0e7ff",

                // 🔥 glow tím xanh nhẹ (đỡ chói)
                textShadow: `
      0 0 6px rgba(139,92,246,0.4),
      0 0 12px rgba(59,130,246,0.25)
    `,
              }}
            >
              <span className="title-text">{title}</span>
            </h1>

            <style>
              {`
.title-text {
  position: relative;
  display: inline-block;
}

/* VỆT SÁNG */
.title-text::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;

  /* 🔥 đổi từ trắng sang tím xanh */
  background: linear-gradient(
    120deg,
    transparent,
    rgba(168,85,247,0.4),
    rgba(96,165,250,0.4),
    transparent
  );

  transform: skewX(-20deg);
  animation: shine 3s infinite; /* chậm lại cho mượt */
}

@keyframes pulseRole {
  0% {
    box-shadow:
      0 0 6px currentColor,
      0 0 12px currentColor;
  }
  50% {
    box-shadow:
      0 0 12px currentColor,
      0 0 24px currentColor,
      0 0 40px currentColor;
  }
  100% {
    box-shadow:
      0 0 6px currentColor,
      0 0 12px currentColor;
  }
}

/* ANIMATION */
@keyframes shine {
  0% { left: -100%; }
  100% { left: 150%; }
}
`}
            </style>

            {/* TOOLBAR ? */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {/* NÚT ? */}
              <div
                onMouseDown={() => {
                  holdTimer.current = setTimeout(() => {
                    setShowRule(true);
                  }, 500);
                }}
                onMouseUp={() => {
                  clearTimeout(holdTimer.current);
                  setShowLore(true);
                }}
                onMouseLeave={() => clearTimeout(holdTimer.current)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "999px",
                  background: "#ffffff10",
                  border: "1px solid #ffffff30",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  backdropFilter: "blur(4px)",
                  boxShadow: "0 0 10px #ffffff22",
                  userSelect: "none",
                  transition: "0.15s",
                  cursor: "pointer",
                  transform: "scale(1)",
                }}
              >
                ?
              </div>
              {/* 📖 CÁCH CHƠI */}
              <div
                onClick={() => setShowHowToPlay(true)} // hoặc setShowHowToPlay(true)
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#ffffff10",
                  border: "1px solid #ffffff30",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "18px",
                  boxShadow: "0 0 10px #ffffff22",
                }}
              >
                📖
              </div>
            </div>

            {/* LORE */}

            {showLore && (
              <div
                onClick={() => setShowLore(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.9)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 99,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: "390px",
                    padding: "24px",
                    background: "linear-gradient(180deg, #1a1a1a, #000)",
                    borderRadius: "14px",
                    lineHeight: "1.5",
                    fontFamily: "serif",
                    color: "#e0d8c3",
                    boxShadow: "0 0 40px #000",
                    border: "1px solid #ffffff22",
                    position: "relative",
                    overflow: "hidden",
                    animation: "fadeLore 0.4s ease-out",
                  }}
                >
                  {/* glow nhẹ */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at 50% 20%, #ffffff11, transparent)",
                      pointerEvents: "none",
                    }}
                  />

                  <button onClick={() => setShowLore(false)}>⬅ ĐÓNG</button>

                  <h3
                    style={{
                      textAlign: "center",
                      marginBottom: "8px",
                      marginTop: "10px",
                      letterSpacing: "2x",
                      fontFamily: "Oswald",
                      fontSize: "24px",
                      textShadow: "0 0 8px #ffffff33",
                    }}
                  >
                    👻 MA SÓI LÀNG BÉO 🐺 🌕 HIỆN ĐẠI 🌕
                  </h3>

                  <p style={{ fontStyle: "italic", opacity: 0.9 }}>
                    Ma Sói Làng Béo thời Hiện đại là thời điểm phe Sói bắt đầu
                    tiến hoá năng lực, không chỉ săn mồi mà còn biết suy tính và
                    thao túng. Dân Làng cũng dần thay đổi, phát triển thành
                    nhiều năng lực phức tạp. Nhưng khi quyền năng ngày một lớn
                    mạnh, niềm tin bắt đầu rạn nứt, Dân Làng không còn tin tưởng
                    nhau nữa và có 1 số thành phần đã tách ra khỏi Làng để hoạt
                    động độc lập.
                  </p>

                  <p>
                    Từ đó, cuộc chơi phân hoá thành nhiều phe:
                    <br />
                    <span
                      onClick={() => {
                        setShowLore(false);
                        setSelectedPhe("DÂN LÀNG");
                      }}
                      style={{
                        color: "#4ade80",
                        textShadow: "0 0 6px #4ade80, 0 0 12px #22c55e",
                        fontWeight: "600",
                      }}
                    >
                      🌿 Dân Làng (19 role)
                    </span>{" "}
                    – chiến đấu bằng thông tin và sự phối hợp.
                    <br />
                    <span
                      onClick={() => {
                        setShowLore(false);
                        setSelectedPhe("SÓI");
                      }}
                      style={{
                        color: "#ef4444",
                        textShadow: "0 0 6px #ef4444, 0 0 14px #b91c1c",
                        fontWeight: "700",
                      }}
                    >
                      🐺 Sói (10 role)
                    </span>{" "}
                    – săn mồi bằng trí tuệ, sự liên kết cùng chiến thuật.
                    <br />
                    <span
                      onClick={() => {
                        setShowLore(false);
                        setSelectedPhe("SOLO");
                      }}
                      style={{
                        color: "#60a5fa",
                        textShadow: "0 0 6px #60a5fa, 0 0 14px #2563eb",
                        fontWeight: "700",
                      }}
                    >
                      👤 Solo (11 role)
                    </span>{" "}
                    – những người hành động vì mục tiêu cá nhân.
                    <br />
                    <span
                      onClick={() => {
                        setShowLore(false);
                        setSelectedPhe("KHÁC");
                      }}
                      style={{
                        color: "#facc15",
                        textShadow: "0 0 6px #facc15, 0 0 14px #eab308",
                        fontWeight: "700",
                      }}
                    >
                      ⚡ Phe Khác / Hỗn Hợp (5 role)
                    </span>{" "}
                    – những kẻ ngoài cuộc phá vỡ cấu trúc và luật lệ.
                    <br />
                    <span
                      onClick={() => {
                        setShowLore(false);
                        setSelectedPhe("ĐẶC BIỆT");
                      }}
                      style={{
                        color: "#a855f7",
                        textShadow: "0 0 6px #a855f7, 0 0 14px #7c3aed",
                        fontWeight: "700",
                      }}
                    >
                      👑 Những role Đặc biệt (2 role)
                    </span>{" "}
                    – xuất hiện trong các tình huống đặc biệt xuyên suốt trận
                    đấu.
                  </p>

                  <p
                    style={{
                      fontStyle: "",
                      opacity: 0.7,
                      marginTop: "5px",
                    }}
                  >
                    Không bên nào thực sự kiểm soát Làng Béo, chỉ có những kẻ
                    hiểu luật chơi...mới có thể tồn tại.
                    <br /> Vậy lựa chọn của bạn sẽ thuộc về phe nào...?
                  </p>
                  <style>
                    {`
   @keyframes fadeLore {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  `}
                  </style>
                </div>
              </div>
            )}

            {showHowToPlay && (
              <div
                onClick={() => setShowHowToPlay(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.85)",
                  display: "flex",
                  fontFamily: "serif",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 99,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "90vw",
                    maxWidth: "380px",
                    padding: "18px",
                    borderRadius: "12px",
                    background: "linear-gradient(180deg, #1b1b1b, #000)",
                    color: "#e6dfc8",
                    lineHeight: "1.6",
                    fontFamily: "serif",
                    boxShadow: "0 0 40px #000",
                  }}
                >
                  <button onClick={() => setShowHowToPlay(false)}>
                    ⬅ ĐÓNG
                  </button>
                  <h3 style={{ textAlign: "center" }}>📘 CÁCH CHƠI</h3>

                  <div
                    style={{
                      flex: 1,
                      background: "linear-gradient(180deg, #1b1b1b, #000)",
                      color: "#e6dfc8",
                      padding: "flex",
                      borderRight: "1px solid #333",
                      fontSize: "16px",
                      fontFamily: "serif",
                      lineHeight: "1.55",
                      overflowY: "auto",
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "center",
                        marginBottom: "5px",
                        fontSize: "15px",
                        fontWeight: "900",
                        fontFamily: "serif",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        textShadow: "0 0 6px rgba(255,255,255,0.2)",
                      }}
                    ></h3>

                    <p>
                      Mỗi người nhận 1 role bí mật qua tin nhắn từ quản trò (lộ
                      role sẽ dễ bị Cupid bắn chết).
                    </p>

                    <p>
                      🌚 BAN ĐÊM: Tự do trao đổi (trừ bị câm) & chủ động thực
                      hiện chức năng thông qua tin nhắn với quản trò.
                    </p>

                    <p>
                      🌝 BAN NGÀY: Được thảo luận tự do:
                      <br />• Sáng đầu tiên: Không vote, chỉ bầu Thẩm Phán
                      <br />• Sáng chẵn (2 4 6): Vote công khai
                      <br />• Sáng lẻ (3 5 7): Vote kín qua tin nhắn với quản
                      trò.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showRule && (
              <div
                onClick={() => setShowRule(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.85)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 99,
                  perspective: "1200px",
                }}
              >
                {/* 📖 SÁCH LUẬT */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "92vw",
                    maxWidth: "380px",
                    height: "90vh",
                    display: "flex",
                    borderRadius: "12px",
                    overflow: "hidden",
                    fontFamily: "serif",
                    boxShadow: "0 0 40px #000",
                    animation: "openBook 0.5s ease",
                    transform: "translateY(-10px)",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "linear-gradient(180deg, #0e0e0e, #000)",
                      color: "#ffb4b4",
                      padding: "10px",
                      fontFamily: "serif",
                      fontSize: "18px",
                      lineHeight: "1.55",
                      overflowY: "auto",
                    }}
                  >
                    <button onClick={() => setShowRule(false)}>⬅ ĐÓNG</button>

                    <h3
                      style={{
                        textAlign: "center",
                        marginBottom: "10px",
                        fontSize: "25px",
                        fontWeight: "900",
                        fontFamily: "serif",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        textShadow: "0 0 6px rgba(255,100,100,0.25)",
                      }}
                    >
                      📜 LUẬT CHƠI 📜
                    </h3>

                    <p>
                      🟢 KHI BỊ GIÀ LÀNG:
                      <br />• Câm → không bật mic nói chuyện / chat / vote / thả
                      sticker
                      <br />• Đuổi → mất quyền vote / rời ghế chơi.
                    </p>

                    <p>
                      🟠 CHẾT NGAY HOẶC MẤT ROLE NẾU:
                      <br />• Nhắc chữ “Oan Hồn”
                      <br />• Chặn tin nhắn
                      <br />• Không chủ động lên ghế khi còn chỗ
                      <br />• Không điểm danh khi ở dưới ghế
                    </p>

                    <p>
                      🔴 KICK KHỎI ROOM NẾU:
                      <br />• Chết rồi nhưng vẫn nói, can thiệp đến game
                      <br />• Phá game, chơi sai nhiệm vụ của phe / role
                      <br />• Toxic, xúc phạm người chơi khác
                      <br />• Xin chơi các phe khác ngoài phe Dân Làng.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                alignItems: "center",
              }}
            >
              {pheList.map((phe) => (
                <div
                  key={phe}
                  onClick={() => setSelectedPhe(phe)}
                  style={{
                    width: "220px",
                    height: "70px",
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${pheColor[phe]}, #000)`,
                    border: `2px solid ${pheColor[phe]}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "900",
                    fontSize: "18px",
                    cursor: "pointer",
                    boxShadow: `0 6px 20px ${pheColor[phe]}66`,
                  }}
                >
                  {pheIcon[phe]} {phe}
                </div>
              ))}
            </div>
          </>
        )}

        {selectedPhe && !selectedRole && (
          <>
            <button
              onClick={() => {
                setSelectedPhe(null);
                setSearch("");
              }}
            >
              ⬅ QUAY LẠI
            </button>

            <h2
              style={{
                textAlign: "center",
                margin: "12px 0",
                fontSize: "26px",
                fontWeight: "900",
                color: pheColor[selectedPhe],
                textShadow: `
                  0 0 8px ${pheColor[selectedPhe]},
                  0 0 18px ${pheColor[selectedPhe]},
                  0 0 30px ${pheColor[selectedPhe]}55
                `,
              }}
            >
              {pheIcon[selectedPhe]} PHE {selectedPhe}
            </h2>

            {/* DESCRIPTION */}
            <p
              style={{
                textAlign: "center",
                fontSize: "12.5px",
                opacity: 0.85,
                marginBottom: "1px",
                lineHeight: "1.7",
                whiteSpace: "pre-line",
              }}
            >
              {pheDescription[selectedPhe].split("\n").map((line, i) =>
                line.startsWith("Nhiệm vụ") ? (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      marginTop: line.startsWith("Nhiệm vụ") ? "10px" : "0px",
                    }}
                  >
                    {" "}
                    <span style={{ textDecoration: "underline" }}>
                      Nhiệm vụ:
                    </span>{" "}
                    {line.replace("Nhiệm vụ:", "")}
                  </span>
                ) : (
                  <span key={i} style={{ display: "block" }}>
                    {line}
                  </span>
                )
              )}
            </p>

            <p style={{ textAlign: "center", opacity: 0.7 }}>
              Tổng số: {roles.filter((r) => r.phe === selectedPhe).length} role
            </p>

            {/* SEARCH */}
            <div style={{ position: "relative", marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="🔍 Tìm role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#ffffff15",
                  fontSize: "14px",
                  color: "white",
                  border: "none",
                }}
              />

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFilter(!showFilter);
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                ⚙️{filterCount > 0 && `(${filterCount})`}
              </div>
            </div>

            {/* FILTER */}
            {showFilter && (
              <div
                ref={filterRef}
                style={{
                  background: "#111",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <button
                  onClick={() => {
                    setFilterDoKho([]);
                    setFilterHoatDong([]);
                    setFilterKyNang([]);
                  }}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    background: "#550000",
                    color: "white",
                  }}
                >
                  ❌ Xoá tất cả chọn lại
                </button>

                <p>⭐ Độ khó:</p>
                {[1, 2, 3, 4, 5].map((lv) => (
                  <label
                    key={lv}
                    style={{ display: "block", marginBottom: "4px" }}
                  >
                    <input
                      type="checkbox"
                      checked={filterDoKho.includes(lv)}
                      onChange={() =>
                        toggleValue(lv, filterDoKho, setFilterDoKho)
                      }
                    />
                    {"⭐".repeat(lv)}
                  </label>
                ))}

                <p>🌗 Hoạt động:</p>
                {hoatDongList.map((hd) => (
                  <label key={hd} style={{ display: "block" }}>
                    <input
                      checked={filterHoatDong.includes(hd)}
                      onChange={() =>
                        toggleValue(hd, filterHoatDong, setFilterHoatDong)
                      }
                      type="checkbox"
                    />
                    {hd}
                  </label>
                ))}

                <p>🧠 Kỹ năng:</p>
                {kyNangList.map((kn) => (
                  <label key={kn} style={{ display: "block" }}>
                    <input
                      checked={filterKyNang.includes(kn)}
                      onChange={() =>
                        toggleValue(kn, filterKyNang, setFilterKyNang)
                      }
                      type="checkbox"
                    />
                    {kn}
                  </label>
                ))}
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
              {roles
                .filter((r) => {
                  return (
                    r.phe === selectedPhe &&
                    r.name.toLowerCase().includes(search.toLowerCase()) &&
                    (filterDoKho.length === 0 ||
                      filterDoKho.includes(r.doKho)) &&
                    (filterHoatDong.length === 0 ||
                      filterHoatDong.includes(r.hoatDong)) &&
                    (filterKyNang.length === 0 ||
                      filterKyNang.some((kn) => r.kyNang?.includes(kn)))
                  );
                })
                .map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "999px",

                      // 🔥 VIỀN SÁNG HƠN
                      border: `1.5px solid ${pheColor[selectedPhe]}`,

                      cursor: "pointer",
                      fontWeight: "800",

                      // 🔥 nền đậm hơn (fix trong suốt)
                      background: `linear-gradient(
            135deg,
            ${pheColor[selectedPhe]}33,
            rgba(0,0,0,0.85)
          )`,

                      // 🔥 glow tập trung viền
                      boxShadow: `
            0 0 8px ${pheColor[selectedPhe]}aa,
            0 0 18px ${pheColor[selectedPhe]}66,
            inset 0 0 10px rgba(0,0,0,0.9)
          `,

                      // 🔥 chữ sáng nhưng không cháy
                      color: "#fff",
                      textShadow: `0 0 6px ${pheColor[selectedPhe]}cc`,

                      animation: "pulseRole 2s infinite",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = `
            0 0 12px ${pheColor[selectedPhe]},
            0 0 28px ${pheColor[selectedPhe]},
            inset 0 0 12px rgba(0,0,0,1)
          `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = `
            0 0 8px ${pheColor[selectedPhe]}aa,
            0 0 18px ${pheColor[selectedPhe]}66,
            inset 0 0 10px rgba(0,0,0,0.9)
          `;
                    }}
                  >
                    {role.name}
                  </div>
                ))}
            </div>
          </>
        )}
        {/* 📖 RULE BUTTON (đặt dưới cùng) */}
        {!selectedPhe && !selectedRole && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div
              onClick={() => setShowRule(true)}
              style={{
                width: "220px",
                height: "50px",
                borderRadius: "16px",
                background: "rgba(0,0,0,0.45)",
                marginTop: "15px",
                backdropFilter: "blur(6px)",
                border: "1px solid #ffffff30",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontWeight: "800",
                boxShadow: "0 0 15px #000000aa, 0 0 10px #ffffff10",
              }}
            >
              📜 LUẬT CHƠI
            </div>
          </div>
        )}

        {/* ===== ROLE DETAIL ===== */}
        {selectedRole && (
          <RoleDetail
            role={selectedRole}
            goBack={() => setSelectedRole(null)}
            onOpenRole={openRoleFromDetail}
          />
        )}
      </div>
    </div>
  );
}
