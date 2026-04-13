import { useState } from "react";

export default function RoleDetail({ role, goBack, onOpenRole }) {
  const [openHOF, setOpenHOF] = useState(false);
  const [breaking, setBreaking] = useState(false);

  const pheColor = {
    "DÂN LÀNG": "#4caf50",
    SÓI: "#f44336",
    SOLO: "#2196f3",
    KHÁC: "#ff9800",
    "ĐẶC BIỆT": "#9c27b0",
  };

  const formatText = (text) => {
    if (!text) return "";

    if (Array.isArray(text)) {
      return text.join("\n");
    }

    // ❌ bỏ replace dấu chấm
    return text;
  };

  const titleByPhe = {
    "DÂN LÀNG": "🌿 THẦN",
    SÓI: "🐺 VUA",
    SOLO: "⚔️ BẬC THẦY",
    KHÁC: "❔ CAO THỦ",
    "ĐẶC BIỆT": "👑 HUYỀN THOẠI",
  };

  const handleSealClick = () => {
    if (breaking) return;

    setBreaking(true);

    setTimeout(() => {
      setOpenHOF(true);
    }, 400); // delay mở HOF

    setTimeout(() => {
      setBreaking(false);
    }, 900); // reset animation
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        borderRadius: "12px",
        minHeight: "100vh",
        fontFamily: "Roboto",
        overflow: "hidden",
        color: "white",

        backgroundImage: `url(${role.image || role.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.55),
              rgba(0,0,0,0.85)
            )
          `,
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "10px", // 🔥 fix spacing toàn bộ UI
        }}
      >
        <button
          onClick={goBack}
          style={{
            alignSelf: "flex-start", // 🔥 không cho nó full width
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid #ffffff30",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "13px",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          ⬅ Quay lại
        </button>

        {/* TITLE */}
        <h1
          style={{
            margin: 5,
            textShadow: `0 0 8px ${pheColor[role.phe]}, 0 0 16px ${
              pheColor[role.phe]
            }`,
          }}
        >
          {role.name}
        </h1>

        {/* MÔ TẢ */}
        <p style={{ fontStyle: "italic", color: "#ccc", margin: 0 }}>
          {role.moTa}
        </p>

        <p style={{ margin: 0 }}>
          <b>Phe:</b>{" "}
          <span style={{ color: pheColor[role.phe] }}>{role.phe}</span>
        </p>

        <p style={{ margin: 0 }}>
          <b>Độ khó:</b> {"⭐".repeat(role.doKho)}
        </p>

        {role.hoatDong && (
          <p style={{ margin: 0 }}>
            <b>Hoạt động:</b> {role.hoatDong}
          </p>
        )}

        {/* KỸ NĂNG */}
        <p style={{ margin: 0 }}>
          <b>Kỹ năng:</b>{" "}
          {Array.isArray(role.kyNang) && role.kyNang.length === 1 ? (
            role.kyNang[0]
          ) : !Array.isArray(role.kyNang) ? (
            <span>{formatText(role.kyNang)}</span>
          ) : null}
        </p>

        {Array.isArray(role.kyNang) && role.kyNang.length > 1 && (
          <div style={{ marginLeft: "10px" }}>
            {role.kyNang.map((kn, i) => (
              <div key={i}>• {kn}</div>
            ))}
          </div>
        )}

        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #ffffff40, transparent)",
            margin: "12px 0",
          }}
        />

        {/* CÁCH CHƠI */}
        <div
          style={{
            background: "rgba(26,26,50,0.75)",
            borderRadius: "10px",
          }}
        >
          <b>Cách chơi:</b>
          <p
            style={{
              margin: "6px 0 0 0",
              lineHeight: "1.7",
              whiteSpace: "pre-line",
            }}
          >
            {formatText(role.cachChoi)}
          </p>
        </div>

        {role.sauChet && (
          <p style={{ margin: 0 }}>
            <u>Hiệu ứng sau khi chết:</u> {role.sauChet}
          </p>
        )}
        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #ffffff40, transparent)",
            margin: "12px 0",
          }}
        />

        {/* HỢP CẠ */}
        <p style={{ margin: 0 }}>
          <b>🤝 Hợp cạ:</b>{" "}
          {role.hopCa.map((r, i) => (
            <span key={i} onClick={() => onOpenRole?.(r)}>
              {r}
              {i < role.hopCa.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        {/* KHẮC CHẾ */}
        <p style={{ margin: 0 }}>
          <b>☠️ Khắc chế:</b>{" "}
          {role.khacChe.map((r, i) => (
            <span key={i} onClick={() => onOpenRole?.(r)}>
              {r}
              {i < role.khacChe.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        {/* KỊ RƠ */}
        {role.kiRo && (
          <p style={{ margin: 0 }}>
            <b>☯️ Kị rơ:</b>{" "}
            {role.kiRo.map((r, i) => (
              <span key={i} onClick={() => onOpenRole?.(r)}>
                {r}
                {i < role.kiRo.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}

        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #ffffff40, transparent)",
            margin: "12px 0",
          }}
        />
        {/* TIPS */}
        <div
          style={{
            background: "rgba(26,26,42,0.65)",
            borderRadius: "10px",
            padding: "10px",
            backdropFilter: "blur(4px)",
          }}
        >
          <b>💡 Tips:</b>
          <p
            style={{
              margin: "6px 0 0 0",
              lineHeight: "1.6",
              whiteSpace: "pre-line",
            }}
          >
            {formatText(role.tips)}
          </p>
        </div>

        {/* 🩸 SEAL */}
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            onClick={handleSealClick}
            className={breaking ? "seal break" : "seal"}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${
                pheColor[role.phe]
              }, #000)`,
              display: "flex",
              justifyContent: "center",
              fontSize: "26px",
              cursor: "pointer",
              border: `3px solid ${pheColor[role.phe]}`,
              boxShadow: `
                inset 0 0 10px #000,
                0 0 12px ${pheColor[role.phe]},
                0 0 25px ${pheColor[role.phe]}55
              `,
            }}
          >
            {role.icon || "🏅"}
          </div>
        </div>

        {/* 🏆 HOF */}
        {openHOF && (
          <div
            style={{
              marginTop: "15px",
              borderRadius: "10px",
              background: "rgba(0,0,0,0.75)",
              textAlign: "center",
              animation: "fadeIn 0.4s ease",
            }}
          >
            {/* 🏆 TOP MVP */}
            {role.hof?.topMVP?.length > 0 && (
              <>
                <p className="hof-title mvp">🏆 TOP MVP 🏆</p>
                {role.hof.topMVP.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </>
            )}

            {/* 👑 DANH HIỆU */}
            {role.hof?.winrate && (
              <>
                <hr />
                <p
                  className="hof-title phe"
                  style={{ color: pheColor[role.phe] }}
                >
                  {titleByPhe[role.phe]} {role.name}
                </p>
                <p>{role.hof.winrate}</p>
              </>
            )}

            {/* 🏅 KỶ LỤC */}
            {role.hof?.achievement && (
              <>
                <hr />
                <p className="hof-title achievement">🏅 KỶ LỤC 🏅</p>
                <p>{role.hof.achievement}</p>
              </>
            )}

            {!role.hof?.topMVP?.length &&
              !role.hof?.winrate &&
              !role.hof?.achievement && (
                <p style={{ opacity: 0.6 }}>Chưa có huyền thoại nào...</p>
              )}
          </div>
        )}
      </div>

      {/* ✨ ANIMATION */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }

        /* 🔥 SEAL NORMAL */
        .seal {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        /* 💥 SEAL BREAK */
        .seal.break {
          animation: crack 0.3s, drop 0.6s forwards;
        }

        @keyframes crack {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(8deg); }
          50% { transform: rotate(-8deg); }
          75% { transform: rotate(6deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes drop {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(120px) scale(0.6); opacity: 0; }
        }

        .hof-title {
          font-weight: 900;
          font-size: 21px;
          margin: 10px 0;
          letter-spacing: 2px;
        }

        .hof-title.mvp {
          text-shadow: 0 0 8px gold, 0 0 18px gold;
        }

        .hof-title.phe {
          animation: pulse 2s infinite;
        }

        .hof-title.achievement {
          animation: flicker 2s infinite;
          text-shadow: 0 0 6px white;
        }
        `}
      </style>
    </div>
  );
}
