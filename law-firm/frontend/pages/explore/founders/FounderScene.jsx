// Founders hero: a lone hiker on an orange haze summit. On arrival an orange
// route traces just inside the ridge up towards him and lights a dot at each stage of the climb.
const ROUTE = 'M0 1259.0 L20 1255.0 L40 1262.0 L60 1258.0 L80 1247.0 L100 1253.0 L120 1272.0 L140 1278.0 L160 1271.0 L180 1263.0 L200 1261.0 L220 1264.0 L240 1265.0 L260 1262.0 L280 1262.0 L300 1259.0 L320 1262.0 L340 1265.0 L360 1260.0 L380 1257.0 L400 1258.0 L420 1259.0 L440 1251.0 L460 1255.0 L480 1263.0 L500 1264.0 L520 1262.0 L540 1263.0 L560 1263.0 L580 1256.0 L600 1256.0 L620 1264.0 L640 1264.0 L660 1258.0 L680 1255.0 L700 1260.0 L720 1261.0 L740 1263.0 L760 1263.0 L780 1264.0 L800 1264.0 L820 1265.0 L840 1265.0 L860 1262.0 L880 1254.0 L900 1239.0 L920 1237.0 L940 1240.0 L960 1237.0 L980 1232.0 L1000 1219.0 L1020 1211.0 L1040 1209.0 L1060 1199.0 L1080 1185.0 L1100 1172.0 L1120 1164.0 L1140 1153.0 L1160 1143.0 L1180 1144.0 L1200 1138.0 L1220 1126.0 L1240 1114.0 L1260 1106.0 L1280 1098.0 L1300 1085.0 L1320 1068.0 L1340 1057.0 L1360 1048.0 L1380 1032.0 L1400 1016.0 L1420 1002.0 L1440 991.0 L1460 984.0 L1480 972.0 L1500 954.0 L1520 930.0 L1540 919.0 L1560 911.0 L1580 899.0 L1600 889.0 L1620 879.0 L1640 866.0 L1660 847.0 L1680 824.0 L1700 804.0 L1720 788.0 L1740 777.0 L1750 773.0'
const DOTS = [[360, 1260.0], [940, 1240.0], [1360, 1048.0], [1750, 773.0]]

export default function FounderScene() {
  return (
    <div className="page-scene founder-scene" aria-hidden="true">
      <img className="page-photo founder-photo" src="/images/hero-founders-lone.jpg" alt="" />
      <svg className="founder-route" viewBox="0 0 2400 1350" preserveAspectRatio="xMidYMid slice">
        <path className="fr-line" d={ROUTE} pathLength="1" />
        {DOTS.map(([x, y], i) => (
          <g key={x} className="fr-dot" style={{ '--i': i }}>
            <line x1={x} x2={x} y1={y + 14} y2="1350" />
            <circle cx={x} cy={y} r="22" className="fr-ring" />
            <circle cx={x} cy={y} r="8" className="fr-core" />
          </g>
        ))}
      </svg>
    </div>
  )
}
