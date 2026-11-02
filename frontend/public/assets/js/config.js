/* ============================================================
   VARDAM'S GOA3 — Central configuration
   Update brand details, images, plots & farmhouse designs here.
   ============================================================ */
(function () {
  "use strict";

  var brand = {
    name: "Vardam's GOA3",
    tagline: "Own Your Piece of Paradise",
    location: "Malvan, Konkan, Maharashtra, India",
    phoneDisplay: "96426 01301",
    phone: "+919642601301",
    whatsapp: "919642601301",
    email: "contact@vardam.com",
    mapEmbed:
      "https://www.google.com/maps?q=Malvan%2C%20Sindhudurg%2C%20Maharashtra%2C%20India&output=embed",
    defaultMessage:
      "Hello Vardam's GOA3, I visited your website and would like to know more about your farmhouse plots and construction services in Malvan, Konkan. Please share more details."
  };

  function wa(message) {
    return (
      "https://wa.me/" + brand.whatsapp + "?text=" +
      encodeURIComponent(message || brand.defaultMessage)
    );
  }

  /* Curated project imagery.
     NOTE: These are representative placeholders until the actual
     Vardam's GOA3 renders (master plan, entrance gate, floor plans,
     interiors & exteriors) are supplied. Swap the URLs below — every
     page updates automatically. */
  function u(id) {
    return (
      "https://images.unsplash.com/" + id +
      "?ixlib=rb-4.1.0&auto=format&fit=crop&w=1800&q=80"
    );
  }

  var images = {
    hero: u("photo-1561831710-3a8abd9657cf"),
    exteriors: [
      u("photo-1561831710-3a8abd9657cf"),
      u("photo-1771366260867-7e07094579d7"),
      u("photo-1787237819544-39f0d4dac2b1"),
      u("photo-1775716215749-f2e0543ebf6e")
    ],
    gate: [
      "assets/img/entrance-gate.jpg",
      u("photo-1775733924258-5363323b3ab8")
    ],
    aerial: [
      "assets/img/master-plan.jpg",
      u("photo-1556490496-45afc7b8b8e5")
    ],
    masterPlan: "assets/img/master-plan.jpg",
    interiors: [
      u("photo-1649083048337-4aeb6dda80bb"),
      u("photo-1773754371144-9dcb02249c33"),
      u("photo-1775923293081-598283c494bc"),
      u("photo-1770941633927-b7a15557e0e1")
    ],
    landscape: [
      u("photo-1750762286053-28632f48e717"),
      u("photo-1792347255199-97c7a7cebda5"),
      u("photo-1730660338791-8d63548efc75")
    ],
    plans: [
      u("photo-1786550860329-f813516e9705"),
      u("photo-1783990349147-906f62b882c1"),
      u("photo-1770200574989-a4cca2c70c00")
    ],
    scenery: [
      u("photo-1766512775127-1463088dc2ad"),
      u("photo-1772729134844-c4224e60edbf"),
      u("photo-1764012393303-157f358bd5fa")
    ]
  };

  /* SAMPLE plot inventory — illustrative only.
     Final plot list, dimensions and availability are shared on enquiry. */
  var plots = [
    { id: "G3-A01", zone: "Creek-Facing", areaSqm: 1100, facing: "East",       status: "Available" },
    { id: "G3-A02", zone: "Creek-Facing", areaSqm: 900,  facing: "North-East", status: "Reserved"  },
    { id: "G3-B01", zone: "Grove",        areaSqm: 750,  facing: "East",       status: "Available" },
    { id: "G3-B02", zone: "Grove",        areaSqm: 650,  facing: "West",       status: "Available" },
    { id: "G3-C01", zone: "Hill-View",    areaSqm: 540,  facing: "North",      status: "On Hold"   },
    { id: "G3-C02", zone: "Corner",       areaSqm: 500,  facing: "South-East", status: "Available" }
  ];

  /* SAMPLE farmhouse design catalogue — concept illustrations.
     Replace names, renders, plans and specifications as designs are finalised. */
  var designs = [
    {
      slug: "vann-villa",
      name: "The Vann Villa",
      tag: "Signature 3 BHK",
      beds: 3, baths: 3, builtup: "2,450 sq.ft",
      exterior: images.exteriors[1],
      plan: images.plans[0],
      interior: images.interiors[0],
      desc: "A single-storey courtyard farmhouse wrapped in deep verandas, opening onto a private garden court beneath the palms.",
      specs: [
        "Open living–dining around a garden court",
        "Wraparound shaded veranda",
        "Master suite with outdoor shower court",
        "Kitchen with utility and store",
        "Covered parking for two cars"
      ]
    },
    {
      slug: "kinara-courtyard",
      name: "The Kinara Courtyard",
      tag: "4 BHK Family Estate",
      beds: 4, baths: 4, builtup: "3,200 sq.ft",
      exterior: images.exteriors[2],
      plan: images.plans[1],
      interior: images.interiors[2],
      desc: "A generous family estate arranged around a water court — long verandas, high roofs and rooms that open to the breeze.",
      specs: [
        "Central water court with sit-out",
        "Four ensuite bedrooms",
        "Double-height living volume",
        "Dining opening to the orchard edge",
        "Staff room and utility block"
      ]
    },
    {
      slug: "chafa-house",
      name: "The Chafa House",
      tag: "Compact 2 BHK",
      beds: 2, baths: 2, builtup: "1,480 sq.ft",
      exterior: images.exteriors[3],
      plan: images.plans[2],
      interior: images.interiors[1],
      desc: "A compact weekend retreat under a single sweeping roof — everything you need, nothing you don't.",
      specs: [
        "Two bedrooms with garden views",
        "Living room with reading alcove",
        "Country kitchen with breakfast deck",
        "Broad entry veranda",
        "Outdoor shower and garden tap"
      ]
    },
    {
      slug: "maadi-manor",
      name: "The Maadi Manor",
      tag: "3 BHK Grove Residence",
      beds: 3, baths: 3, builtup: "2,700 sq.ft",
      exterior: images.exteriors[0],
      plan: images.plans[0],
      interior: images.interiors[3],
      desc: "A grove-side residence with a pool court and long east-facing veranda, designed for slow Konkan afternoons.",
      specs: [
        "Private pool court with deck",
        "East-facing sleeping wing",
        "Living pavilion with bar counter",
        "Guest suite with separate entry",
        "Landscaped entry court"
      ]
    }
  ];

  window.GOA3 = {
    brand: brand,
    wa: wa,
    images: images,
    plots: plots,
    designs: designs
  };
})();
