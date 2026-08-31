---
name: ephemeris-precision
description: High-precision astronomical mathematics, Julian Day calculation, Nutation, Topocentric Parallax, and True Ayanamsha computation standards for ASTRO360.
---

# Ephemeris Precision & Astronomical Mathematics Standards

## 1. Fundamental Constants & Coordinate Transformations

### Julian Day & Julian Ephemeris Time ($JDE$)
For any UTC calendar date $(Y, M, D, H, Min, Sec)$:
$$JD = \lfloor 365.25(Y + 4716) \rfloor + \lfloor 30.6001(M + 1) \rfloor + D + \frac{H + \frac{Min}{60} + \frac{Sec}{3600}}{24} + B - 1524.5$$
Where $B = 2 - A + \lfloor A/4 \rfloor$ for Gregorian dates, and $A = \lfloor Y/100 \rfloor$.

Julian Centuries from J2000.0:
$$T = \frac{JD - 2451545.0}{36525.0}$$

### Obliquity of the Ecliptic ($\varepsilon_0$)
Using the IAU Laskar high-precision formula:
$$\varepsilon_0 = 23^\circ 26' 21.448'' - 46.8150'' T - 0.00059'' T^2 + 0.001813'' T^3$$

### Nutation in Longitude ($\Delta \psi$) & Obliquity ($\Delta \varepsilon$)
Calculated using the IAU 2000B series accounting for lunar and solar principal terms:
$$\varepsilon = \varepsilon_0 + \Delta \varepsilon$$
True Geocentric Apparent Longitude:
$$\lambda_{apparent} = \lambda_{geometric} + \Delta \psi - \frac{20.4955''}{R}$$
(Accounting for planetary aberration where $R$ is the heliocentric distance in AU).

---

## 2. Canonical Ayanamsha Definitions

| Ayanamsha System | Epoch Longitude ($J2000.0$) | Reference Anchor |
| :--- | :--- | :--- |
| **True Lahiri (Chitra Paksha)** | $23^\circ 51' 25.53''$ | Fixed to Spica (Chitra Star) at exact $180^\circ 00' 00''$ |
| **Krishnamurti (KP)** | $23^\circ 45' 56.00''$ | KP Stellar Sub-Lord system calibration |
| **B.V. Raman** | $22^\circ 24' 39.00''$ | Traditional Raman ephemeris baseline |
| **Fagan-Bradley** | $24^\circ 44' 22.00''$ | Aldebaran at $15^\circ$ Taurus baseline |
| **Tropical (Western)** | $0^\circ 00' 00.00''$ | Vernal Equinox ($0^\circ$ Aries) |

---

## 3. Topocentric Parallax Correction

For the Moon and inner planets (Mercury, Venus, Mars), observations from Earth's surface must account for observer latitude $\phi$ and elevation $h$:
$$\rho \sin \phi' = \frac{b}{a} \sin \phi + \frac{h}{a} \sin \phi$$
$$\rho \cos \phi' = \cos \phi + \frac{h}{a} \cos \phi$$
$$\tan \Delta \alpha = \frac{-\rho \cos \phi' \sin \pi \sin H}{\cos \delta - \rho \cos \phi' \sin \pi \cos H}$$
Where $\pi$ is the equatorial horizontal parallax and $H$ is the local hour angle.

---

## 4. True Local Apparent Time & Equation of Time ($EoT$)

Ascendant (Lagna) and D60 (Shashtiamsha) micro-harmonics shift every 120 seconds. Calculations must apply the Equation of Time ($EoT$):
$$EoT = 4 \times (\lambda_\odot - \alpha_\odot) \text{ minutes}$$
$$\text{True Solar Time} = \text{Local Mean Time} + EoT$$
