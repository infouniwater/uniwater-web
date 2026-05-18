"""
Build 8 sample solution data-sheet PDFs (one per solution slug) using a
hand-written minimal PDF generator. No external Python dependencies required.

Output: public/data-sheets/{slug}.pdf
"""

import os


def escape_text(s):
    return s.replace("\\", "\\\\").replace("(", r"\(").replace(")", r"\)")


def build_pdf(lines, target):
    content_parts = []
    y = 800
    for line in lines:
        y -= line.get("gap_before", 0)
        size = line["size"]
        text = escape_text(line["text"])
        content_parts.append(
            "BT /F1 {sz} Tf 50 {y} Td ({txt}) Tj ET".format(sz=size, y=y, txt=text)
        )
        y -= int(size * 1.4)
    content_stream = ("\n".join(content_parts) + "\n").encode("ascii", errors="replace")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        b"<< /Length "
        + str(len(content_stream)).encode()
        + b" >>\nstream\n"
        + content_stream
        + b"endstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]

    out = b"%PDF-1.4\n%\xc4\xe5\xf2\xe5\xeb\xa7\xf3\xa0\xd0\xc4\xc6\n"
    offsets = []
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(out))
        out += "{} 0 obj\n".format(i).encode() + obj + b"\nendobj\n"
    xref_offset = len(out)
    out += b"xref\n0 " + str(len(objects) + 1).encode() + b"\n0000000000 65535 f \n"
    for off in offsets:
        out += "{:010d} 00000 n \n".format(off).encode()
    out += (
        b"trailer\n<< /Size "
        + str(len(objects) + 1).encode()
        + b" /Root 1 0 R >>\nstartxref\n"
        + str(xref_offset).encode()
        + b"\n%%EOF\n"
    )

    with open(target, "wb") as f:
        f.write(out)


SOLUTIONS = [
    {
        "slug": "bathroom-filter",
        "title": "BATHROOM WATER FILTERS",
        "wordmark": "BathSoft.",
        "intro": [
            "A bathroom filter has to do three things at once: treat the water, fit",
            "the space, not announce itself.",
        ],
        "configurations": [
            ("Mono", "Single cylinder", "Basic fittings. Single shower. Standard CP. Lowest demand."),
            ("Duo", "Double cylinder", "Rain shower with body jets, or two showers running together. Mid demand."),
            ("Trio", "Triple cylinder", "Master suite with steam, jacuzzi, multiple high-flow outlets. Highest demand."),
        ],
        "price_from": "Rs. 14,000",
        "tech": [
            ("Capacity range", "500 - 6,000 LPH (per bathroom or whole-house)"),
            ("Vessel materials", "FRP / SS316"),
            ("Service flow", "Sized to peak household draw"),
            ("Backwash flow", "1.5x service flow"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models; none for Manual"),
        ],
    },
    {
        "slug": "whole-house-water-filter",
        "title": "WHOLE-HOUSE FILTRATION",
        "wordmark": "HomeSoft.",
        "intro": [
            "One softened, filtered supply for the whole house. Every shower, every",
            "sink, every appliance. Treated at the inlet, distributed through the home.",
        ],
        "configurations": [
            ("2K", "2,000 LPH", "3-4 bathroom homes. Mid-rise apartment, compact villa."),
            ("4K", "4,000 LPH", "5-6 bathrooms, small villas with utility loads."),
            ("6K", "6,000 LPH", "Large villas, duplexes, garden draw. Highest residential capacity."),
        ],
        "price_from": "Rs. 1,00,000",
        "tech": [
            ("Capacity range", "2,000 - 6,000 LPH"),
            ("Stages", "Sediment > Iron > Carbon > Softening (four-stage)"),
            ("Vessel materials", "FRP / SS316"),
            ("Backwash flow", "1.5x service flow"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models"),
        ],
    },
    {
        "slug": "drinking-water-solution",
        "title": "DRINKING WATER SYSTEMS",
        "wordmark": None,
        "intro": [
            "The kitchen is the one tap where chemistry matters more than feel. The",
            "shower can forgive imperfect water. The kitchen cannot.",
        ],
        "configurations": [
            ("Kitchen RO", "Wall-mounted or under-sink", "For TDS above 500 ppm. With post-RO mineral correction."),
            ("Kitchen Non-RO (UF+UV)", "Wall-mounted", "For TDS below 200 ppm. Natural minerals stay; pathogens go."),
            ("Centralised", "25-50-100 LPH plant room", "For villas, offices, schools, clinics."),
        ],
        "price_from": "Rs. 15,000",
        "tech": [
            ("Capacity range", "15 - 100 LPH"),
            ("Pre-treatment", "Sediment + activated carbon ahead of membrane"),
            ("Polish", "Re-mineralisation cartridge (RO)"),
            ("Sanitisation", "UV lamp downstream (UF+UV models)"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC"),
        ],
    },
    {
        "slug": "iron-filter",
        "title": "IRON FILTER",
        "wordmark": None,
        "intro": [
            "Borewell-fed homes have it. Old galvanised mains have it. Orange grout.",
            "Faint stains under the WC rim. Iron destroys downstream resin.",
        ],
        "configurations": [
            ("Bathroom Mono/Duo/Trio", "Per-bathroom", "For one or two bathrooms affected by iron."),
            ("Whole-house 2K/4K/6K", "Inlet", "Treats every tap from a single point. Right answer for borewell homes."),
            ("Industrial 8K-30K LPH", "Building / commercial", "Buildings, complexes, hotels, hospitals."),
        ],
        "price_from": "Rs. 14,000",
        "tech": [
            ("Capacity range", "500 - 30,000 LPH"),
            ("Media", "Katalox / equivalent iron-removal media"),
            ("Sequence", "Iron filter sits UPSTREAM of softening"),
            ("Regeneration", "Manual or automatic with timer/volumetric trigger"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models"),
        ],
    },
    {
        "slug": "water-softener",
        "title": "WATER SOFTENER",
        "wordmark": None,
        "intro": [
            "The single biggest improvement to a home water supply. The unglamorous",
            "workhorse. The one most homes do not have.",
        ],
        "configurations": [
            ("Bathroom Mono/Duo/Trio", "Per-bathroom", "Local softening at the bathroom feed. Manual or automatic regen."),
            ("Whole-house 2K/4K/6K", "Inlet", "Soft water to every tap. Brine regeneration on a schedule."),
        ],
        "price_from": "Rs. 14,000",
        "tech": [
            ("Capacity range", "500 - 6,000 LPH"),
            ("Resin", "Tulsion / Ionex strong-acid cation resin"),
            ("Output hardness", "< 30 ppm typical post-softening"),
            ("Regeneration", "Brine, timer or volumetric"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models"),
        ],
    },
    {
        "slug": "arsenic-filter",
        "title": "ARSENIC FILTER",
        "wordmark": None,
        "intro": [
            "A locality-led problem. West Bengal, Bihar, parts of Assam and UP. The",
            "most-overlooked Indian water risk. Tasteless, odourless, colourless.",
        ],
        "configurations": [
            ("Point-of-use kitchen", "Drinking + cooking only", "For the tap that feeds chai, dal, the drinking glass."),
            ("Whole-house pre-treatment", "Inlet", "For affected boreholes. Sized to household draw."),
        ],
        "price_from": "Rs. 18,000",
        "tech": [
            ("Capacity range", "15 - 6,000 LPH"),
            ("Media", "Specialised arsenic-adsorbent media (specific to As)"),
            ("Output target", "< 10 ppb (WHO guideline)"),
            ("Pre-treatment", "Sediment + carbon recommended upstream"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models"),
        ],
    },
    {
        "slug": "sediment-filter",
        "title": "SEDIMENT FILTER",
        "wordmark": None,
        "intro": [
            "The chained pre-treatment. Protects every system downstream. The",
            "cheapest filter, doing the most invisible work.",
        ],
        "configurations": [
            ("Bathroom Mono/Duo/Trio", "Per-bathroom", "Pre-treatment for a single feed."),
            ("Whole-house 2K/4K/6K", "Inlet", "First stage of the HomeSoft four-stage train."),
        ],
        "price_from": "Rs. 14,000",
        "tech": [
            ("Capacity range", "500 - 6,000 LPH"),
            ("Filtration", "Multi-grade sand + gravel media"),
            ("Particulate cut", "20-50 micron typical"),
            ("Regeneration", "Backwash on schedule"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models"),
        ],
    },
    {
        "slug": "activated-carbon-filter",
        "title": "ACTIVATED CARBON FILTER",
        "wordmark": None,
        "intro": [
            "Chlorine, odour, taste. The summer-chemical-smell stage. Approachable,",
            "not chemistry-textbook.",
        ],
        "configurations": [
            ("Bathroom Mono/Duo/Trio", "Per-bathroom", "Removes chlorine taste at the bathroom feed."),
            ("Whole-house 2K/4K/6K", "Inlet", "Third stage of the HomeSoft four-stage train."),
        ],
        "price_from": "Rs. 14,000",
        "tech": [
            ("Capacity range", "500 - 6,000 LPH"),
            ("Media", "Coal-based or coconut-shell activated carbon"),
            ("Removes", "Chlorine, chloramines, taste, odour, organics"),
            ("Often paired", "Carbon for taste, UV for pathogens (drinking-water RO)"),
            ("Inlet pressure", "1.5 - 4.5 kg/cm2"),
            ("Power", "230V AC for Automatic models"),
        ],
    },
]


def main():
    out_dir = r"c:/Users/user/uniwater-web/uniwater/public/data-sheets"
    os.makedirs(out_dir, exist_ok=True)

    for sol in SOLUTIONS:
        lines = [{"text": "UNIWATER  -  " + sol["title"], "size": 20, "gap_before": 0}]
        if sol["wordmark"]:
            lines.append({"text": sol["wordmark"], "size": 13, "gap_before": 6})
        for intro in sol["intro"]:
            lines.append({"text": intro, "size": 10, "gap_before": 4})

        lines.append({"text": "CONFIGURATIONS", "size": 12, "gap_before": 20})
        for name, sub, desc in sol["configurations"]:
            lines.append({"text": "  " + name + "  -  " + sub, "size": 10, "gap_before": 8})
            lines.append({"text": "    " + desc, "size": 9, "gap_before": 2})

        lines.append({"text": "WHAT IS INCLUDED", "size": 12, "gap_before": 18})
        for item in [
            "  - Engineered vessel and media, sized to your draw and chemistry",
            "  - Controls and valves (manual or automatic)",
            "  - Plumbing, electrical, mounting, commissioning",
            "  - Pre-install and post-install water analysis",
            "  - One-year warranty on all components",
            "  - One-year AMC included (quarterly Standard, monthly Comprehensive)",
        ]:
            lines.append({"text": item, "size": 10, "gap_before": 3})

        lines.append({"text": "TECHNICAL SPECIFICATIONS", "size": 12, "gap_before": 18})
        for label, value in sol["tech"]:
            lines.append({"text": "  " + label + ":  " + value, "size": 10, "gap_before": 3})

        lines.append({
            "text": "MRP from " + sol["price_from"] + " inclusive of 18% GST. Final price set after a free site survey.",
            "size": 9,
            "gap_before": 20,
        })
        lines.append({"text": "uniwater.co.in  -  support@uniwater.co.in  -  +91 97487 45193", "size": 9, "gap_before": 4})
        lines.append({"text": "The discipline that decides year four.", "size": 9, "gap_before": 2})

        target = out_dir + "/" + sol["slug"] + ".pdf"
        build_pdf(lines, target)
        print("wrote", sol["slug"] + ".pdf")


if __name__ == "__main__":
    main()
