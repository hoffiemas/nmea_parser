
export function parseGSV(nmeaArray: string[]): { [k: string]: any } | null {

  if (!nmeaArray || nmeaArray.length > 20) {
    return null;
  }
  const numberOfMessages = parseInt(nmeaArray[1], 10);
  const numberOfThisMessage = parseInt(nmeaArray[2], 10);
  const satelitesInView = parseInt(nmeaArray[3], 10);
  const satelites = [];

  for (let i = 4; i < nmeaArray.length;) {
    const satId = parseInt(nmeaArray[i], 10);
    i++;
    const elevationInDeg = parseInt(nmeaArray[i], 10);
    i++;
    const azimuthInDeg = parseInt(nmeaArray[i], 10);
    i++;
    const signalToNoiseRatio = parseInt(nmeaArray[i], 10);
    i++;
    satelites.push({ satId, elevationInDeg, azimuthInDeg, signalToNoiseRatio });
  }

  return {
    numberOfMessages,
    numberOfThisMessage,
    satelitesInView,
    satelites,
  };
}