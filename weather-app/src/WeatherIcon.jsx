import fogIcon from "./assets/images/icon-fog.webp";
import drizzleIcon from "./assets/images/icon-drizzle.webp";
import partlyCloudyIcon from "./assets/images/icon-partly-cloudy.webp";
import snowIcon from "./assets/images/icon-snow.webp";
import stormIcon from "./assets/images/icon-storm.webp";
import rainIcon from "./assets/images/icon-rain.webp";
import overcastIcon from "./assets/images/icon-overcast.webp";
import sunnyIcon from "./assets/images/icon-sunny.webp";
function getWeatherIcon(code) {
  if (code == 0 || code == 1) return sunnyIcon;
  if (code == 2) return partlyCloudyIcon;
  if (code == 3) return overcastIcon;
  if (code == 45 || code == 48) return fogIcon;
  if (code >= 51 && code <= 57) return drizzleIcon;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return rainIcon;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return snowIcon;
  if (code >= 95) return stormIcon;
  return stormIcon;
}
export default getWeatherIcon;
