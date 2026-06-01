export const transportData = [
  {
    id: 1,
    mode: "Trains",
    icon: "🚄",
    intro: "Italy's rail network is excellent between major cities — Trenitalia and Italo high-speed trains connect Rome-Florence in 90 minutes, Rome-Naples in 70 minutes, Milan-Venice in 2.5 hours. Book in advance for the best prices.",
    providers: [
      { name: "Trenitalia", url: "https://www.trenitalia.com", description: "Italy's national rail operator. Frecciarossa (red arrow) high-speed trains are the flagship service. Book 60+ days ahead for up to 60% off." },
      { name: "Italo", url: "https://www.italotreno.it", description: "Private high-speed competitor — often cheaper than Trenitalia. Sleek trains, good WiFi, excellent Club carriage. Strong on Milan-Rome-Naples corridor." },
      { name: "Trenitalia Regionale", url: "https://www.trenitalia.com", description: "Slower regional trains serving smaller towns and scenic routes. No advance booking required — just turn up and buy. Often free with rail passes." }
    ],
    steps: [
      "Book at least 2-3 weeks ahead for intercity journeys — prices rise sharply close to travel",
      "Validate your ticket in yellow machines before boarding regional trains (not required for tickets bought on app)",
      "First class (Prima/Executive) is often only €15-20 more — worth it for long journeys",
      "Rail passes (Eurail/Interrail) can work for flexible travellers but usually don't save money in Italy alone",
      "Naples-Pompeii: take the Circumvesuviana commuter line (€2.80, 35 minutes) not the main line"
    ],
    tip: "The scenic Domodossola-Locarno mountain railway (Centovalli Express) is one of Europe's most beautiful train journeys — completely unsung."
  },
  {
    id: 2,
    mode: "Car Rental",
    icon: "🚗",
    intro: "A car is essential for rural Tuscany, Puglia, Sicily's interior and the Amalfi coast. Not recommended in city centres — ZTL (restricted traffic zones) will generate fines that arrive months later. Book small: Italian roads are narrow.",
    providers: [
      { name: "AutoEurope", url: "https://www.autoeurope.com", description: "Best aggregator for Italian car hire — compare 20 suppliers simultaneously. Often 30-40% cheaper than booking direct with Hertz or Avis." },
      { name: "Sicily by Car", url: "https://www.sicilybycars.com", description: "Local Sicilian operator with excellent service and prices. Essential for Sicily — avoids the major multinationals' confusing local surcharges." },
      { name: "Maggiore", url: "https://www.maggiore.it", description: "Italy's largest domestic rental company with good coverage at small towns and airports. Good alternative when international chains have limited stock." }
    ],
    steps: [
      "Book a car 3-6 weeks in advance — last-minute cars in peak season can triple in price",
      "Never accept the rental company's overpriced CDW insurance — buy separately from InsureMyRental or similar (€50 vs €200 from the desk)",
      "Download the ZTL map for every city you'll visit — restricted zones in Rome, Florence, Venice (Mestre) are heavily enforced by cameras",
      "An international driving permit is not legally required for EU/US licences but some companies request it — check your license requirements",
      "Petrol (benzina) is more expensive in Italy than most EU countries — fill up at unmanned self-service stations for 20% savings",
      "Autopista tolls: keep cash or a card handy — major motorways charge every 50-100km"
    ],
    tip: "For Amalfi Coast: hire a driver rather than driving yourself. The SS163 is extremely difficult in summer traffic and parking costs more than the driver."
  },
  {
    id: 3,
    mode: "Buses",
    icon: "🚌",
    intro: "Long-distance coaches fill the gaps between cities not served by trains — Puglia, Calabria, rural Sicily. Slower but often much cheaper than trains. Regional buses (autolinee) are the only option for some hill towns.",
    providers: [
      { name: "FlixBus", url: "https://www.flixbus.it", description: "Pan-European coach network now covering most Italian routes. Very cheap but slow — useful for budget travellers and routes with poor train connections." },
      { name: "Sais Autolinee", url: "https://www.saisautolinee.it", description: "Principal bus operator in Sicily — connects Palermo airport to Cefalù, Agrigento and most Sicilian towns. Reliable and cheap at €7-14." },
      { name: "Marino Autolinee", url: "https://www.marinobus.it", description: "Good coverage of Southern Italy including routes between Naples, Bari, Lecce and Reggio Calabria. Overnight coaches save on accommodation." }
    ],
    steps: [
      "Book FlixBus online well in advance — it sells out for summer routes",
      "Regional buses typically depart from the main piazza or outside the train station — look for yellow SITA or regional operator signs",
      "In Sicily and Puglia, a combined rail+bus day pass saves money on rural explorations",
      "City buses in Italy are often crowded and rarely run on schedule — always allow 20-30 minutes extra"
    ],
    tip: "The Palermo-Agrigento bus costs €8 vs a taxi at €120. The views from the bus window as you descend to the Valley of the Temples are spectacular."
  },
  {
    id: 4,
    mode: "Ferries",
    icon: "⛴️",
    intro: "Italy's islands are served by excellent ferry networks. Sicily is 30 minutes from mainland by fast ferry. Sardinia requires a longer crossing (8-14 hours overnight or 6 hours by day). The Aeolian, Egadi, Pelagian and Pontine island chains are all reachable.",
    providers: [
      { name: "Grandi Navi Veloci", url: "https://www.gnv.it", description: "Main overnight ferry operator to Sicily and Sardinia from Genoa, Civitavecchia and Palermo. Book cabins 2-3 months ahead for summer crossings." },
      { name: "Tirrenia", url: "https://www.tirrenia.it", description: "State-backed ferry company covering most Italian island routes including Sicily, Sardinia and smaller islands. Part of Grimaldi Group." },
      { name: "Liberty Lines", url: "https://www.libertylines.it", description: "Fast hydrofoil service covering Sicily's offshore islands — Aeolian Islands, Ustica, Egadi. 45 minutes Trapani to Favignana, 70 minutes Milazzo to Lipari." },
      { name: "Moby Lines", url: "https://www.moby.it", description: "Sardinia specialist with routes from Livorno, Civitavecchia and Genoa. Popular with families driving their car to Sardinia." }
    ],
    steps: [
      "Book ferry cabins for summer crossings at least 6-8 weeks in advance — Sardinia in August sells out months ahead",
      "Taking a car to the islands adds significantly to cost — consider renting locally if your stay is less than 10 days",
      "Overnight ferries save a hotel night — book a cabin rather than a seat for journeys over 6 hours",
      "Hydrofoils (aliscafi) are faster than ferries but cannot run in rough weather — always have a backup plan for island travel"
    ],
    tip: "The overnight ferry from Palermo to Naples (8 hours) is a romantic way to travel — dinner on deck watching Sicily disappear, then arrive at Naples at dawn."
  },
  {
    id: 5,
    mode: "Local Transit",
    icon: "🚇",
    intro: "Rome, Milan, Naples and Turin have metro systems. Buses complete coverage in most cities. Venice is entirely on water — vaporetti (water buses) and walking. City transit cards and day passes save money and time.",
    providers: [
      { name: "ATAC Roma", url: "https://www.atac.roma.it", description: "Rome's public transport — 3 metro lines plus extensive bus network. 48-hour tourist pass at €7 covers unlimited travel. Download the Moovit app for real-time routes." },
      { name: "ATM Milano", url: "https://www.atm.it", description: "Milan's exemplary metro — 5 lines, runs until 1am on weekdays. The most reliable urban transit in Italy. Buy a 10-journey carnet for the best value." },
      { name: "ACTV Venezia", url: "https://www.actv.it", description: "Venice's water bus network — 22 vaporetto lines. The 24/48/72/7-day passes are essential value for more than 3 journeys. Always validate before boarding." },
      { name: "ANM Napoli", url: "https://www.anm.it", description: "Naples public transit — includes the world's most beautiful metro stations (Toledo, Università — genuine museums underground). Also runs Funicolare to Vomero." }
    ],
    steps: [
      "In Rome: validate your ticket in yellow machines every time — even if it's unlimited. Inspectors fine non-validated passengers",
      "In Venice: buy the ACTV app pass for fastest boarding without queue",
      "Milan: the ATM app shows live positions of all trams and buses",
      "In smaller cities: taxis or private transfers are often more practical than trying to understand infrequent local bus services"
    ],
    tip: "Rome's underground ancient ruins interrupt metro construction — hence only 3 lines after 100 years of planning. Every dig hits a 2,000-year-old wall."
  },
  {
    id: 6,
    mode: "Taxis & Apps",
    icon: "🚕",
    intro: "Italian taxis are metered and regulated — starting fare €3.50 in Rome, supplements for luggage, nights and Sundays. NCC (private hire) apps Uber and FREE NOW operate in major cities. Always ask for a receipt.",
    providers: [
      { name: "itTaxi", url: "https://www.ittaxi.it", description: "Official Italian taxi booking app — works in all major cities. Confirms price before booking, shows driver rating and accepts card payment." },
      { name: "FREE NOW", url: "https://free-now.com", description: "Pan-European taxi app operating in Rome, Milan and Naples. More reliable than street hailing, upfront pricing, card payment. Formerly MyTaxi." },
      { name: "Uber", url: "https://www.uber.com", description: "Only operates UberBlack (executive cars) in Italy — no UberX. More expensive than taxis but reliable booking experience. Available in Rome, Milan, Florence." },
      { name: "GoCar", url: "https://www.gocaritalia.it", description: "Italy's own ride-share equivalent — works across more Italian cities than Uber. Download before you arrive." }
    ],
    steps: [
      "Always use the meter — if a driver quotes a fixed price upfront without showing the meter, decline",
      "Rome to Fiumicino airport: fixed rate of €50 applies (law). From Ciampino: fixed €31",
      "Supplements apply: €1.50 night surcharge (10pm-6am), €1.50 Sunday, €1 per large bag",
      "Private minibus transfers from airports are often better value for families — book 48 hours ahead"
    ],
    tip: "In Sicily and Puglia, negotiate a half-day or full-day rate with a local taxi driver for rural exploration — €150-200 gets you a knowledgeable guide with wheels for the day."
  }
]
