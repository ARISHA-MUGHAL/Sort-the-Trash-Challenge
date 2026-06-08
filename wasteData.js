/* ===============================
   SORT THE TRASH CHALLENGE
   UPDATED wasteData.js
   5 Dustbins + 100 Waste Items
================================ */

/* ===============================
   FIVE WASTE BINS
================================ */

const WASTE_BINS = [
  {
    bin: "Blue Bin",
    category: "Hazardous Waste",
    colorClass: "blue",
    key: "blue"
  },
  {
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    colorClass: "yellow",
    key: "yellow"
  },
  {
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    colorClass: "grey",
    key: "grey"
  },
  {
    bin: "Green Bin",
    category: "Reusable Waste",
    colorClass: "green",
    key: "green"
  },
  {
    bin: "Black Bin",
    category: "Food Waste / By-products",
    colorClass: "black",
    key: "black"
  }
];

/* ===============================
   WASTE ITEMS
   Total: 100 Items
================================ */

const WASTE_ITEMS = [
  /* ===============================
     BLUE BIN – HAZARDOUS WASTE
     30 Items
  ================================ */

  {
    item: "Grease Waste",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Grease waste is treated as hazardous waste and should be handled through the approved waste disposal route.",
    icon: "⚙️"
  },
  {
    item: "Used Oil",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Used oil is hazardous and must be collected separately for approved disposal.",
    icon: "🛢️"
  },
  {
    item: "Waste Oil from Generator",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Waste oil from generators is hazardous and should be disposed of through an approved waste handler.",
    icon: "🛢️"
  },
  {
    item: "Waste Oil from Machine",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Waste oil from machinery may contain harmful contaminants and must be handled as hazardous waste.",
    icon: "🛢️"
  },
  {
    item: "Oil Contaminated Rags",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Rags contaminated with oil are hazardous and must not be mixed with general or recyclable waste.",
    icon: "🧽"
  },
  {
    item: "Oil Contaminated Cotton",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Cotton contaminated with oil should be placed in the hazardous waste bin for safe disposal.",
    icon: "🩹"
  },
  {
    item: "Oil Absorbent Pads",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Absorbent pads contaminated with oil are hazardous and require approved disposal.",
    icon: "🧻"
  },
  {
    item: "Diesel Tank Sludge",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Diesel tank sludge is hazardous due to fuel contamination and must be handled through the approved route.",
    icon: "⛽"
  },
  {
    item: "Wastewater Treatment Sludge",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Wastewater treatment sludge may contain contaminants and should be handled as hazardous waste.",
    icon: "🧫"
  },
  {
    item: "Paint Waste",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Paint waste contains chemical components and should be disposed of through an approved hazardous waste route.",
    icon: "🎨"
  },
  {
    item: "Empty Paint Container",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Paint containers may contain chemical residue and should be managed as hazardous waste.",
    icon: "🪣"
  },
  {
    item: "Empty Chemical Container",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Empty chemical containers may still contain chemical residue and must be treated as hazardous waste.",
    icon: "🧴"
  },
  {
    item: "Expired Chemical",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Expired chemicals are hazardous and require controlled disposal through the approved waste route.",
    icon: "☣️"
  },
  {
    item: "Leftover Chemical Sample",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Leftover chemical samples must be segregated and disposed of as hazardous waste.",
    icon: "🧪"
  },
  {
    item: "Chemical Contaminated Gloves",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Gloves contaminated with chemicals are hazardous and should not be placed in general PPE waste.",
    icon: "🧤"
  },
  {
    item: "Used Oil Filter",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Used oil filters contain oil residue and should be handled as hazardous waste.",
    icon: "🛢️"
  },
  {
    item: "Ink Cartridge",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Ink cartridges are used products that should be disposed of or recycled through the approved route.",
    icon: "🖨️"
  },
  {
    item: "Printer Toner",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Printer toners contain chemical powder and should be managed as hazardous waste.",
    icon: "🖨️"
  },
  {
    item: "Used Battery",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Used batteries contain hazardous materials and must never be mixed with general waste.",
    icon: "🔋"
  },
  {
    item: "Tube Light",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Tube lights may contain hazardous components and should be disposed through the approved waste handler.",
    icon: "💡"
  },
  {
    item: "Energy Saver Bulb",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Energy saver bulbs require special handling and should not be disposed with general waste.",
    icon: "💡"
  },
  {
    item: "Glass Wool",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Glass wool can be harmful during handling and should follow the hazardous waste disposal route.",
    icon: "🧱"
  },
  {
    item: "Broken Needle",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Broken needles are sharp clinical waste and must be placed in the hazardous waste bin.",
    icon: "💉"
  },
  {
    item: "Used Syringe",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Used syringes are clinical waste and must never be mixed with general waste.",
    icon: "💉"
  },
  {
    item: "Contaminated Cotton",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Contaminated cotton is clinical waste and requires controlled disposal.",
    icon: "🩹"
  },
  {
    item: "Expired Medicine",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Expired medicines should be treated as hazardous clinical waste.",
    icon: "💊"
  },
  {
    item: "Microbiology Lab Waste",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Microbiology lab waste may contain biological contamination and must be handled as hazardous waste.",
    icon: "🔬"
  },
  {
    item: "Contaminated Culture Media",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Contaminated culture media is infectious waste and must be disposed of safely.",
    icon: "🧫"
  },
  {
    item: "Rejected Wrapping Film",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "Rejected wrapping film is handled under the hazardous waste route as per the waste segregation chart.",
    icon: "🎞️"
  },
  {
    item: "BOPP Waste",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation: "BOPP waste from primary packaging should be placed in the hazardous waste bin as per the waste chart.",
    icon: "🎞️"
  },

  /* ===============================
     YELLOW BIN – MUNICIPAL / ORGANIC WASTE
     15 Items
  ================================ */

  {
    item: "Excess Food",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Excess food is biodegradable organic waste and should be placed in the municipal or organic waste bin.",
    icon: "🍱"
  },
  {
    item: "Expired Food",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Expired food is municipal or organic waste when it is not chemically contaminated.",
    icon: "🥫"
  },
  {
    item: "Egg Shells",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Egg shells are biodegradable organic waste and should be placed in the yellow bin.",
    icon: "🥚"
  },
  {
    item: "Garden Debris",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Garden debris is biodegradable and should be collected as organic waste.",
    icon: "🍂"
  },
  {
    item: "Tea Waste",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Tea waste is biodegradable and belongs in the municipal or organic waste bin.",
    icon: "🍵"
  },
  {
    item: "Fruit Peels",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Fruit peels are biodegradable organic waste and should be placed in the yellow bin.",
    icon: "🍌"
  },
  {
    item: "Vegetable Peels",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Vegetable peels are organic biodegradable waste and should be placed in the yellow bin.",
    icon: "🥕"
  },
  {
    item: "Canteen Waste",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Canteen waste should be treated as municipal or organic waste unless contaminated with hazardous material.",
    icon: "🍽️"
  },
  {
    item: "Kitchen Waste",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Kitchen waste is generally biodegradable and should be placed in the municipal or organic waste bin.",
    icon: "🍲"
  },
  {
    item: "Leaves from Landscaping",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Leaves from landscaping are organic waste and should be collected in the yellow bin.",
    icon: "🍃"
  },
  {
    item: "Plant Trimmings",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Plant trimmings are biodegradable and should be placed in the organic waste bin.",
    icon: "🌿"
  },
  {
    item: "Used Tissue from Canteen",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Used tissue from canteen use is municipal waste and should be placed in the yellow bin.",
    icon: "🧻"
  },
  {
    item: "Food Plate Scraps",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Food plate scraps are organic waste and should go into the municipal or organic waste bin.",
    icon: "🍛"
  },
  {
    item: "Organic Sweepings",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Organic sweepings should be collected as municipal or organic waste.",
    icon: "🧹"
  },
  {
    item: "Compostable Waste",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation: "Compostable waste is biodegradable and belongs in the municipal or organic waste bin.",
    icon: "🌱"
  },

  /* ===============================
     GREY BIN – RECYCLABLE / NON-HAZARDOUS WASTE
     30 Items
  ================================ */

  {
    item: "Paper Waste",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Paper waste is recyclable and should be placed in the grey bin.",
    icon: "📄"
  },
  {
    item: "Printed Paper",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Printed paper is office waste and should be collected for recycling.",
    icon: "📄"
  },
  {
    item: "Used Stationery",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Used stationery is non-hazardous office waste and should go into the recyclable waste bin.",
    icon: "✏️"
  },
  {
    item: "Old Files",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Old files are office waste and can be recycled or reused where possible.",
    icon: "📁"
  },
  {
    item: "Used Envelopes",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Used envelopes are paper-based office waste and should be placed in the grey bin.",
    icon: "✉️"
  },
  {
    item: "Old Notebooks",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Old notebooks are recyclable office waste and should be placed in the grey bin.",
    icon: "📓"
  },
  {
    item: "Office Cartons",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Office cartons are recyclable and should be placed in the grey bin.",
    icon: "📦"
  },
  {
    item: "Penaflex",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Penaflex is non-hazardous office waste and should be collected separately for handling.",
    icon: "🪧"
  },
  {
    item: "Corrugated Box",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Corrugated boxes are secondary packaging waste and should be recycled or reused.",
    icon: "📦"
  },
  {
    item: "Empty Carton",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Empty cartons are recyclable secondary packaging waste.",
    icon: "📦"
  },
  {
    item: "Product Label Waste",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Labels are non-hazardous packaging waste and should be collected in the recyclable bin.",
    icon: "🏷️"
  },
  {
    item: "Carton Strip",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Carton strips are secondary packaging waste and should be placed in the grey bin.",
    icon: "📦"
  },
  {
    item: "Outer Packaging Material",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Outer packaging material is non-hazardous recyclable packaging waste.",
    icon: "📦"
  },
  {
    item: "Paper-Based Packaging Waste",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Paper-based packaging waste should be collected for recycling or reuse.",
    icon: "📄"
  },
  {
    item: "Shrink Wrap from Carton Bundle",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Shrink wrap from carton bundles should be placed in the recyclable or non-hazardous waste bin.",
    icon: "🧻"
  },
  {
    item: "Wood Scrap",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Wood scrap is separated recyclable waste and should be placed in the grey bin.",
    icon: "🪵"
  },
  {
    item: "Metal Scrap",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Metal scrap is recyclable separated waste and should be collected separately.",
    icon: "🔩"
  },
  {
    item: "PVC Scrap",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "PVC scrap is non-hazardous separated waste and should be handed over for recycling or reuse.",
    icon: "🧱"
  },
  {
    item: "Electrical Wires",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Electrical wires are separated recyclable waste and should be collected in the grey bin.",
    icon: "🔌"
  },
  {
    item: "Empty Plastic Bottle",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Empty plastic bottles are recyclable waste and should be placed in the grey bin.",
    icon: "🧴"
  },
  {
    item: "Broken Acrylic",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Broken acrylic is non-hazardous separated waste and should be collected separately.",
    icon: "🪟"
  },
  {
    item: "Broken Glass",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Broken glass is separated waste and should be handled carefully before placing in the grey bin.",
    icon: "🧊"
  },
  {
    item: "Scrap Pipe",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Scrap pipes are recyclable separated waste and should be placed in the grey bin.",
    icon: "🚰"
  },
  {
    item: "Scrap Pallet",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Scrap pallets are separated waste and should be reused or recycled where possible.",
    icon: "🪵"
  },
  {
    item: "Plastic Scrap",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Plastic scrap should be collected separately for recycling or reuse.",
    icon: "♻️"
  },
  {
    item: "Empty Plastic Container of Flavor",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Empty plastic flavor containers are non-hazardous when not chemically contaminated and should go in the grey bin.",
    icon: "🧴"
  },
  {
    item: "Empty Plastic Container of Additives",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Empty additive containers are non-hazardous when not chemically contaminated and should be collected separately.",
    icon: "🧴"
  },
  {
    item: "Extracted Polyethylene Bags",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Extracted polyethylene bags are non-hazardous manufacturing waste and should be placed in the grey bin.",
    icon: "🛍️"
  },
  {
    item: "Empty Jam Container",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "Empty jam containers from manufacturing use are non-hazardous recyclable waste.",
    icon: "🍯"
  },
  {
    item: "Hygiene PPE Waste",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation: "PPE waste from hygiene use is non-hazardous when not chemically or biologically contaminated.",
    icon: "🧤"
  },

  /* ===============================
     GREEN BIN – REUSABLE WASTE
     12 Items
  ================================ */

  {
    item: "Non-Extracted Polyethylene Bags",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Non-extracted polyethylene bags can be treated as reusable waste as per the defined process.",
    icon: "🛍️"
  },
  {
    item: "Non-Extracted Polyethylene Bags of Tea",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Non-extracted polyethylene bags of tea are reusable waste and should be placed in the green bin.",
    icon: "🍵"
  },
  {
    item: "Leftover Biscuits from Table Conveyor",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Leftover biscuits from the table conveyor may be reused as per the approved process.",
    icon: "🍪"
  },
  {
    item: "Packaging Material for Reuse",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Packaging material suitable for reuse should be placed in the reusable waste bin.",
    icon: "📦"
  },
  {
    item: "Packaging Residue from Area",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Packaging residue that can be reused should be placed in the green bin.",
    icon: "📦"
  },
  {
    item: "Rejected Biscuits from Stackers",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Rejected biscuits from stackers may be reused in the process as per the defined route.",
    icon: "🍪"
  },
  {
    item: "Rejected Biscuits from Oven to Crumb",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Rejected biscuits from oven to crumb are reusable waste as per the process route.",
    icon: "🍪"
  },
  {
    item: "Reusable Production Waste",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Reusable production waste should be placed in the green bin for defined reuse handling.",
    icon: "🔁"
  },
  {
    item: "Reusable Process Material",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Material that can be reused in the process should be placed in the reusable waste bin.",
    icon: "🔁"
  },
  {
    item: "Clean Rework Biscuit",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Clean rework biscuit may be reused as per process control requirements.",
    icon: "🍪"
  },
  {
    item: "Reusable Packaging Residue",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Reusable packaging residue should follow the defined reuse route and be placed in the green bin.",
    icon: "📦"
  },
  {
    item: "Reusable Process Leftover",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation: "Process leftover that is approved for reuse should be placed in the reusable waste bin.",
    icon: "🔁"
  },

  /* ===============================
     BLACK BIN – FOOD WASTE / BY-PRODUCTS
     13 Items
  ================================ */

  {
    item: "Burnt Biscuits",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Burnt biscuits are food waste or by-products and should be placed in the black bin.",
    icon: "🍪"
  },
  {
    item: "Swept Sugar",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Swept sugar is food waste or by-product and should be placed in the black bin.",
    icon: "🍚"
  },
  {
    item: "Swept Flour",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Swept flour is food waste or by-product and should be collected in the black bin.",
    icon: "🌾"
  },
  {
    item: "Flour Waste",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Flour waste is categorized as food wastage or by-product.",
    icon: "🌾"
  },
  {
    item: "Swept Dough",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Swept dough is food waste and should follow the food by-product route.",
    icon: "🥣"
  },
  {
    item: "Biscuit Crumbs",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Biscuit crumbs are food by-products and should be placed in the black bin.",
    icon: "🍪"
  },
  {
    item: "Broken Biscuits",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Broken biscuits are food waste or by-products and must be collected separately.",
    icon: "🍪"
  },
  {
    item: "Residual Oil from Oven",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Residual oil from oven is categorized as food waste or by-product in this bin mapping.",
    icon: "🛢️"
  },
  {
    item: "Food By-products",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Food by-products should be placed in the black bin as per the waste segregation chart.",
    icon: "🥨"
  },
  {
    item: "Oven Cutting Waste",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Oven cutting waste is food waste or by-product and should be placed in the black bin.",
    icon: "🔪"
  },
  {
    item: "Cutting Waste",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Cutting waste from production is food waste or by-product and should go into the black bin.",
    icon: "🔪"
  },
  {
    item: "Rejected Food By-product",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Rejected food by-products should be managed through the defined food waste or by-product route.",
    icon: "🥨"
  },
  {
    item: "Swept Biscuit Powder",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation: "Swept biscuit powder is a food by-product and should be collected in the black bin.",
    icon: "🍪"
  }
];

/* ===============================
   EXPOSE DATA TO script.js
================================ */

window.WASTE_BINS = WASTE_BINS;
window.WASTE_ITEMS = WASTE_ITEMS;