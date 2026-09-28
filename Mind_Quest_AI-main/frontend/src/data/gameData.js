// MindQuest AI - Master Cognitive Game Data Banks

// ==========================================
// 1. FOCUS GAME DATA & CATEGORIZED DISTRACTORS
// ==========================================
export const FOCUS_TARGET_POOLS = [
  // Food
  { id: "apple", emoji: "🍎", name: "Red Apple", category: "food", similar: ["🍅", "🍓", "🍒", "🍑", "🍉", "🌶️", "🎈", "🌹"] },
  { id: "banana", emoji: "🍌", name: "Yellow Banana", category: "food", similar: ["🍋", "🌽", "🧀", "🌙", "⚡", "⭐", "🔔", "🎗️"] },
  { id: "pizza", emoji: "🍕", name: "Slice of Pizza", category: "food", similar: ["🥪", "🌮", "🧀", "🍰", "🥧", "🥞", "🧇", "🍞"] },
  { id: "coffee", emoji: "☕", name: "Hot Coffee", category: "food", similar: ["🍵", "🧋", "🥤", "🍺", "🍷", "🍸", "🧉", "🍶"] },
  // Animals
  { id: "cat", emoji: "🐱", name: "Curious Cat", category: "animals", similar: ["🐶", "🦊", "🐯", "🦁", "🐰", "🐻", "🐼", "🐨"] },
  { id: "dog", emoji: "🐶", name: "Playful Dog", category: "animals", similar: ["🐱", "🦊", "🐺", "🐻", "🐼", "🐨", "🦁", "🐵"] },
  { id: "fox", emoji: "🦊", name: "Clever Fox", category: "animals", similar: ["🐱", "🐶", "🦁", "🐯", "🐺", "🐴", "🦌", "🐿️"] },
  { id: "frog", emoji: "🐸", name: "Green Tree Frog", category: "animals", similar: ["🐢", "🦎", "🐍", "🐊", "🦖", "🐛", "🥑", "🥦"] },
  // Vehicles
  { id: "car", emoji: "🚗", name: "Red Sedan", category: "vehicles", similar: ["🏎️", "🚕", "🚙", "🚓", "🚒", "🚑", "🛻", "🚌"] },
  { id: "rocket", emoji: "🚀", name: "Space Rocket", category: "vehicles", similar: ["🛸", "✈️", "🚁", "🛰️", "☄️", "⚡", "🏹", "🎆"] },
  { id: "bike", emoji: "🚲", name: "Bicycle", category: "vehicles", similar: ["🛴", "🛵", "🏍️", "🛺", "🛹", "🛼", "🏎️", "🚗"] },
  { id: "airplane", emoji: "✈️", name: "Passenger Jet", category: "vehicles", similar: ["🚀", "🛸", "🚁", "🦅", "🕊️", "🛰️", "🪁", "🎈"] },
  // Technology
  { id: "laptop", emoji: "💻", name: "Laptop", category: "tech", similar: ["🖥️", "📱", "⌨️", "🖱️", "🕹️", "📺", "📟", "💾"] },
  { id: "headphones", emoji: "🎧", name: "Headphones", category: "tech", similar: ["🎙️", "📻", "🔈", "🔉", "🔊", "🎛️", "🎵", "📱"] },
  { id: "camera", emoji: "📷", name: "Camera", category: "tech", similar: ["📹", "📽️", "📸", "🔍", "🔎", "📱", "💻", "📻"] },
  { id: "phone", emoji: "📱", name: "Smartphone", category: "tech", similar: ["💻", "🖥️", "📟", "⌚", "📻", "🕹️", "📷", "🔋"] },
  // Nature & Weather
  { id: "star", emoji: "⭐", name: "Golden Star", category: "nature", similar: ["🌟", "✨", "💫", "⚡", "☀️", "🌙", "🔥", "💥"] },
  { id: "lightning", emoji: "⚡", name: "High Voltage Bolt", category: "nature", similar: ["🔥", "⭐", "🌟", "✨", "💥", "💡", "☀️", "☄️"] },
  { id: "fire", emoji: "🔥", name: "Roaring Flame", category: "nature", similar: ["⚡", "⭐", "💥", "🏮", "🕯️", "🌋", "☄️", "🌟"] },
  { id: "tree", emoji: "🌳", name: "Oak Tree", category: "nature", similar: ["🌲", "🌴", "🌵", "🌿", "☘️", "🍀", "🥦", "🪴"] },
  // Sports & Games
  { id: "soccer", emoji: "⚽", name: "Soccer Ball", category: "sports", similar: ["🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🎳"] },
  { id: "trophy", emoji: "🏆", name: "Golden Trophy", category: "sports", similar: ["🥇", "🥈", "🥉", "👑", "🎖️", "🏅", "⭐", "🔔"] },
  { id: "basketball", emoji: "🏀", name: "Basketball", category: "sports", similar: ["⚽", "🏈", "⚾", "🎾", "🏐", "🧶", "🍊", "🎃"] },
  // Music & Objects
  { id: "guitar", emoji: "🎸", name: "Electric Guitar", category: "music", similar: ["🎻", "🪕", "🎹", "🎺", "🎷", "🥁", "🎵", "🎶"] },
  { id: "diamond", emoji: "💎", name: "Gemstone Diamond", category: "objects", similar: ["💍", "👑", "🔮", "✨", "⭐", "💠", "🧊", "🪙"] },
  { id: "crown", emoji: "👑", name: "Royal Crown", category: "objects", similar: ["🏆", "🥇", "💍", "💎", "⭐", "🎩", "🪙", "🔔"] },
  { id: "clock", emoji: "🕒", name: "Wall Clock", category: "objects", similar: ["⏱️", "⏲️", "⏰", "🧭", "⏳", "⌛", "🪙", "🔘"] },
  { id: "key", emoji: "🔑", name: "Golden Key", category: "objects", similar: ["🗝️", "🔨", "🔧", "🪛", "🔒", "🔓", "🧲", "🔔"] }
];

export const GENERAL_DISTRACTORS = [
  "🍇", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍐", "🍑", "🍒", "🍓", "🥝", "🥥", "🥑",
  "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️", "🛺",
  "🛸", "🛰️", "🪐", "🌍", "🌕", "☄️", "✨", "💫", "☀️", "🌤️", "⛅", "🌧️", "🌩️", "❄️", "🌪️", "🌈",
  "🐶", "🐕", "🐩", "🐺", "🦊", "🦁", "🐯", "🐆", "🐴", "🦄", "🦓", "🦌", "🐮", "🐷", "🐸", "🐵", "🐼", "🐨",
  "📱", "💻", "🖥️", "⌨️", "🖱️", "🕹️", "🎙️", "📻", "📺", "📽️", "🧭", "⏱️", "🔋", "💡", "🔦", "📡"
];

export const FOCUS_TARGETS = FOCUS_TARGET_POOLS;
export const FOCUS_DISTRACTORS = GENERAL_DISTRACTORS;

// ==========================================
// 2. MEMORY GAME DATA (14 Categories, 100+ Symbols)
// ==========================================
export const MEMORY_CATEGORIES = {
  animals: { name: "Animals", symbols: ["🦁", "🐯", "🐻", "🐼", "🐨", "🦊", "🐵", "🐘", "🐸", "🐧"] },
  space: { name: "Space", symbols: ["🚀", "🛸", "🛰️", "🪐", "🌕", "⭐", "☄️", "🌌", "☀️", "🌙"] },
  tech: { name: "Tech", symbols: ["💻", "📱", "🎧", "📷", "🕹️", "🤖", "🔋", "💾", "🖥️", "⌨️"] },
  nature: { name: "Nature", symbols: ["🌳", "🌴", "🌵", "🌸", "🌻", "🍀", "🍁", "🍄", "🌹", "🌿"] },
  food: { name: "Food", symbols: ["🍎", "🍕", "🍔", "🍣", "🌮", "🍦", "🍩", "🍓", "🍉", "🍇"] },
  travel: { name: "Travel", symbols: ["✈️", "🚢", "🚂", "🚁", "🚗", "⛵", "🏖️", "🏔️", "🏕️", "🗽"] },
  sports: { name: "Sports", symbols: ["⚽", "🏀", "🎾", "🏈", "⚾", "🥊", "🎿", "🏆", "🥇", "🎳"] },
  science: { name: "Science", symbols: ["🔬", "🧪", "🧬", "🔭", "🧲", "⚛️", "💊", "🌡️", "💉", "🔮"] },
  music: { name: "Music", symbols: ["🎸", "🎹", "🎺", "🎻", "🥁", "🎷", "🎵", "🎙️", "🎧", "📻"] },
  weather: { name: "Weather", symbols: ["☀️", "🌧️", "⚡", "❄️", "🌪️", "🌈", "⛅", "🌊", "🌤️", "🌫️"] },
  objects: { name: "Objects", symbols: ["💎", "👑", "🔑", "🕒", "🎒", "☂️", "🎁", "💡", "📦", "🧲"] },
  tools: { name: "Tools", symbols: ["🔨", "🔧", "🪛", "🪚", "🧰", "⚙️", "📏", "✂️", "🔒", "🪜"] },
  shapes: { name: "Shapes", symbols: ["🔴", "🔵", "🟡", "🟢", "🟣", "🔶", "🔷", "🔺", "⭐", "💠"] },
  numbers: { name: "Symbols", symbols: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"] }
};

export const ALL_MEMORY_SYMBOLS = Object.values(MEMORY_CATEGORIES).flatMap(c => c.symbols);

// ==========================================
// 3. REACTION GAME TARGET POOLS (FALLING ITEMS ENGINE)
// ==========================================
export const REACTION_TARGET_POOLS = [
  {
    theme: "Space Mission",
    prompt: "Catch all the Rockets!",
    targetEmoji: "🚀",
    targetName: "Rocket",
    distractors: ["🛸", "🛰️", "🪐", "⭐", "🌙", "☄️", "🌍", "☀️", "✈️", "🚁", "🎈", "☁️"]
  },
  {
    theme: "Fresh Orchard",
    prompt: "Catch all juicy Red Apples!",
    targetEmoji: "🍎",
    targetName: "Red Apple",
    distractors: ["🍊", "🍌", "🍉", "🍇", "🍓", "🍍", "🥝", "🍒", "🍑", "🍐", "🍋", "🥥"]
  },
  {
    theme: "High Energy",
    prompt: "Catch all Lightning Bolts!",
    targetEmoji: "⚡",
    targetName: "Lightning Bolt",
    distractors: ["🔥", "✨", "💥", "🌟", "💡", "☀️", "💎", "🔋", "🌈", "☄️", "🔦", "💫"]
  },
  {
    theme: "Treasure Vault",
    prompt: "Catch all brilliant Diamonds!",
    targetEmoji: "💎",
    targetName: "Diamond",
    distractors: ["👑", "💍", "🪙", "🏆", "🥇", "⭐", "🔮", "✨", "🎁", "🔑", "⚡", "🪞"]
  },
  {
    theme: "Pet Haven",
    prompt: "Catch all playful Golden Puppies!",
    targetEmoji: "🐶",
    targetName: "Puppy",
    distractors: ["🐱", "🐰", "🦊", "🐻", "🐼", "🐨", "🦁", "🐯", "🐵", "🐸", "🐹", "🐷"]
  },
  {
    theme: "Tech Lab",
    prompt: "Catch all Fast Laptops!",
    targetEmoji: "💻",
    targetName: "Laptop",
    distractors: ["📱", "🖥️", "⌨️", "🖱️", "🕹️", "📺", "📷", "🎧", "📻", "⌚", "🎙️", "🔌"]
  },
  {
    theme: "Championship",
    prompt: "Catch all Golden Trophies!",
    targetEmoji: "🏆",
    targetName: "Golden Trophy",
    distractors: ["⚽", "🏀", "🎾", "🏈", "⚾", "🏐", "🥇", "🥈", "🥉", "🥊", "🎯", "🏓"]
  },
  {
    theme: "Night Campfire",
    prompt: "Catch all Blazing Flames!",
    targetEmoji: "🔥",
    targetName: "Flame",
    distractors: ["⚡", "✨", "💥", "💡", "☀️", "🏮", "🕯️", "🌋", "☄️", "🌟", "🎇", "🎆"]
  }
];

// ==========================================
// 4. PATTERN GAME DATA (130+ Words across 14 Categories)
// ==========================================
export const PATTERN_WORDS = [
  // 1. Programming & Technology (12)
  { word: "REACT", category: "Programming", hint: "Popular declarative JavaScript library for user interfaces", difficulty: 1 },
  { word: "PYTHON", category: "Programming", hint: "High-level language known for clean syntax and data science", difficulty: 1 },
  { word: "JAVASCRIPT", category: "Programming", hint: "Ubiquitous dynamic language powering client and server web apps", difficulty: 3 },
  { word: "DATABASE", category: "Technology", hint: "Organized collection of structured electronic records", difficulty: 2 },
  { word: "NETWORK", category: "Technology", hint: "Interconnected nodes communicating via shared protocols", difficulty: 2 },
  { word: "COMPUTER", category: "Technology", hint: "Electronic device for storing and processing data", difficulty: 2 },
  { word: "ROBOT", category: "Technology", hint: "Automated machine executing programmed physical tasks", difficulty: 1 },
  { word: "SOFTWARE", category: "Technology", hint: "Programs and operating information used by a computer", difficulty: 2 },
  { word: "SERVER", category: "Technology", hint: "Computer system that provides resources or data to clients", difficulty: 1 },
  { word: "BROWSER", category: "Technology", hint: "Application program for navigating and viewing web pages", difficulty: 2 },
  { word: "ALGORITHM", category: "Technology", hint: "A step-by-step computational procedure for solving problems", difficulty: 3 },
  { word: "COMPILER", category: "Technology", hint: "Translates high-level source code into executable machine code", difficulty: 2 },

  // 2. Animals (10)
  { word: "DOLPHIN", category: "Animals", hint: "Intelligent ocean mammal known for echolocation clicks", difficulty: 2 },
  { word: "CHEETAH", category: "Animals", hint: "Fastest terrestrial mammal capable of 70 mph bursts", difficulty: 2 },
  { word: "ELEPHANT", category: "Animals", hint: "Largest living land mammal with a long muscular trunk", difficulty: 2 },
  { word: "PENGUIN", category: "Animals", hint: "Flightless aquatic bird thriving in cold polar oceans", difficulty: 2 },
  { word: "GIRAFFE", category: "Animals", hint: "Tallest living animal with distinctive neck vertebrae", difficulty: 2 },
  { word: "OCTOPUS", category: "Animals", hint: "Eight-limbed soft-bodied cephalopod with decentralized nerves", difficulty: 2 },
  { word: "KANGAROO", category: "Animals", hint: "Marsupial native to Australia known for powerful hopping legs", difficulty: 2 },
  { word: "FLAMINGO", category: "Animals", hint: "Pink wading bird frequently resting on a single leg", difficulty: 2 },
  { word: "TIGER", category: "Animals", hint: "Largest apex feline predator with black vertical stripes", difficulty: 1 },
  { word: "EAGLE", category: "Animals", hint: "Large bird of prey with keen eyesight and hooked talons", difficulty: 1 },

  // 3. Science (10)
  { word: "GRAVITY", category: "Science", hint: "Universal fundamental force attracting masses together", difficulty: 2 },
  { word: "PHOTOSYNTHESIS", category: "Science", hint: "Plants converting sunlight and carbon dioxide into glucose", difficulty: 3 },
  { word: "MOLECULE", category: "Science", hint: "Group of atoms bonded together by covalent forces", difficulty: 2 },
  { word: "ECOSYSTEM", category: "Science", hint: "Biological community of organisms interacting with environment", difficulty: 2 },
  { word: "GENETICS", category: "Science", hint: "Study of heredity and genetic variation across generations", difficulty: 2 },
  { word: "EVOLUTION", category: "Science", hint: "Gradual development of species through natural selection", difficulty: 3 },
  { word: "VELOCITY", category: "Science", hint: "Vector physical quantity denoting speed with direction", difficulty: 2 },
  { word: "MAGNETISM", category: "Science", hint: "Physical phenomenon produced by the motion of electric charges", difficulty: 3 },
  { word: "ATOM", category: "Science", hint: "Smallest constituent unit of ordinary matter that has properties of element", difficulty: 1 },
  { word: "ENERGY", category: "Science", hint: "Quantitative property transferred to a body to perform work", difficulty: 1 },

  // 4. Geography (10)
  { word: "CONTINENT", category: "Geography", hint: "One of Earth's large continuous landmasses", difficulty: 2 },
  { word: "PENINSULA", category: "Geography", hint: "Piece of land bordered by water on three sides", difficulty: 3 },
  { word: "ARCHIPELAGO", category: "Geography", hint: "Extensive cluster or chain of scattered islands", difficulty: 3 },
  { word: "GLACIER", category: "Geography", hint: "Slowly moving massive accumulation of compressed snow and ice", difficulty: 2 },
  { word: "VOLCANO", category: "Geography", hint: "Rupture in planetary crust that expels molten magma", difficulty: 2 },
  { word: "CANYON", category: "Geography", hint: "Deep gorge carved through bedrock by flowing rivers", difficulty: 1 },
  { word: "EQUATOR", category: "Geography", hint: "Imaginary parallel line equidistant from north and south poles", difficulty: 2 },
  { word: "PLATEAU", category: "Geography", hint: "Elevated expanse of flat land rising steeply above surrounds", difficulty: 2 },
  { word: "DESERT", category: "Geography", hint: "Arid biome characterized by extremely low precipitation", difficulty: 1 },
  { word: "OCEAN", category: "Geography", hint: "Vast continuous body of salt water covering 71% of Earth", difficulty: 1 },

  // 5. Space & Astronomy (10)
  { word: "GALAXY", category: "Space", hint: "Gravitationally bound system of stars, gas, and dark matter", difficulty: 1 },
  { word: "NEBULA", category: "Space", hint: "Enormous interstellar cloud of dust and glowing plasma", difficulty: 2 },
  { word: "ASTEROID", category: "Space", hint: "Small rocky object in space orbiting the Sun", difficulty: 2 },
  { word: "TELESCOPE", category: "Space", hint: "Optical instrument designed to observe distant celestial bodies", difficulty: 3 },
  { word: "CONSTELLATION", category: "Space", hint: "Pattern of recognizable stars named after mythical figures", difficulty: 3 },
  { word: "SUPERNOVA", category: "Space", hint: "Cataclysmic stellar explosion ending the life of a massive star", difficulty: 3 },
  { word: "SATELLITE", category: "Space", hint: "Natural or manufactured object in persistent orbital rotation", difficulty: 3 },
  { word: "ECLIPSE", category: "Space", hint: "Obscuration of celestial light when one body casts shadow on another", difficulty: 2 },
  { word: "PLANET", category: "Space", hint: "Astronomical body in orbit around a star with sufficient self-gravity", difficulty: 1 },
  { word: "ORBIT", category: "Space", hint: "Curved trajectory of an object around a point in space", difficulty: 1 },

  // 6. Food & Culinary (10)
  { word: "CHOCOLATE", category: "Food", hint: "Sweet roasted confection derived from cacao seeds", difficulty: 2 },
  { word: "AVOCADO", category: "Food", hint: "Creamy pear-shaped fruit rich in monounsaturated fats", difficulty: 2 },
  { word: "CINNAMON", category: "Food", hint: "Aromatic culinary spice peeled from inner tree bark", difficulty: 2 },
  { word: "SPAGHETTI", category: "Food", hint: "Traditional long, thin cylindrical Italian pasta noodles", difficulty: 3 },
  { word: "PINEAPPLE", category: "Food", hint: "Tropical composite fruit crowned with spiky tufts", difficulty: 3 },
  { word: "ESPRESSO", category: "Food", hint: "Concentrated dark coffee brewed under high vapor pressure", difficulty: 2 },
  { word: "CROISSANT", category: "Food", hint: "Buttery, flaky laminated pastry of Austrian viennoiserie heritage", difficulty: 3 },
  { word: "VANILLA", category: "Food", hint: "Sweet fragrant flavoring harvested from tropical orchid pods", difficulty: 2 },
  { word: "BREAD", category: "Food", hint: "Staple baked food prepared from dough of flour and water", difficulty: 1 },
  { word: "CHEESE", category: "Food", hint: "Dairy product made from curdled milk with diverse textures", difficulty: 1 },

  // 7. Nature & Weather (10)
  { word: "RAINFOREST", category: "Nature", hint: "Dense evergreen canopy characterized by intense annual rainfall", difficulty: 3 },
  { word: "HURRICANE", category: "Weather", hint: "Violently rotating tropical cyclone generating torrential storms", difficulty: 3 },
  { word: "SUNFLOWER", category: "Nature", hint: "Heliotropic tall blossom known for facing direct sunlight", difficulty: 3 },
  { word: "WATERFALL", category: "Nature", hint: "Steep cascades where water plunges over precipitous rocks", difficulty: 3 },
  { word: "BIODIVERSITY", category: "Nature", hint: "Biological variety and richness of species in an environment", difficulty: 3 },
  { word: "AVALANCHE", category: "Nature", hint: "Rapid catastrophic collapse of compacted snow down a mountainside", difficulty: 3 },
  { word: "LIGHTNING", category: "Weather", hint: "Electrostatic discharge balancing voltage between clouds and Earth", difficulty: 3 },
  { word: "BLIZZARD", category: "Weather", hint: "Prolonged severe winter storm with howling gales and snow", difficulty: 2 },
  { word: "HORIZON", category: "Nature", hint: "Apparent boundary line separating Earth surface from the sky", difficulty: 2 },
  { word: "MEADOW", category: "Nature", hint: "Open tract of grassland supporting wildflowers and pollinators", difficulty: 1 },

  // 8. Sports & Fitness (10)
  { word: "CRICKET", category: "Sports", hint: "Bat-and-ball sport played between two teams of 11 on a 22-yard pitch", difficulty: 2 },
  { word: "FOOTBALL", category: "Sports", hint: "Globally popular game contested with 11 players trying to score in net", difficulty: 2 },
  { word: "MARATHON", category: "Sports", hint: "Long-distance endurance running test spanning 26.2 miles", difficulty: 2 },
  { word: "CHAMPION", category: "Sports", hint: "Title awarded to the victorious competitor in tournament play", difficulty: 2 },
  { word: "GYMNASTICS", category: "Sports", hint: "Athletic discipline displaying balance, somersaults, and bar feats", difficulty: 3 },
  { word: "TRIATHLON", category: "Sports", hint: "Grueling multisport race comprising swim, cycle, and road run", difficulty: 3 },
  { word: "SNOWBOARD", category: "Sports", hint: "Single wide deck strapped to boots to descend snowy alpine pistes", difficulty: 3 },
  { word: "ATHLETICS", category: "Sports", hint: "Comprehensive suite of competitive track, field, and sprint events", difficulty: 3 },
  { word: "TENNIS", category: "Sports", hint: "Racket sport played individually against single opponent across net", difficulty: 1 },
  { word: "STAMINA", category: "Sports", hint: "Physical endurance and resilience during prolonged athletic strain", difficulty: 2 },

  // 9. Movies & Arts (10)
  { word: "CINEMA", category: "Movies", hint: "Art or technique of making and showing motion pictures", difficulty: 1 },
  { word: "MONUMENT", category: "Art", hint: "Structure built to honor notable figures or historical events", difficulty: 2 },
  { word: "PORTRAIT", category: "Art", hint: "Artistic painting or likeness focusing on human facial expression", difficulty: 2 },
  { word: "SCULPTURE", category: "Art", hint: "Three-dimensional art shaped by carving, modeling, or casting", difficulty: 3 },
  { word: "SYMPHONY", category: "Art", hint: "Elaborate multi-movement acoustic composition for full orchestra", difficulty: 2 },
  { word: "MOSAIC", category: "Art", hint: "Decorative pattern crafted by assembling colored tile or glass chips", difficulty: 1 },
  { word: "CATHEDRAL", category: "Art", hint: "Principal church housing a bishop's official episcopal throne", difficulty: 3 },
  { word: "PALETTE", category: "Art", hint: "Flat wooden board on which a painter blends primary pigment colors", difficulty: 2 },
  { word: "THEATER", category: "Movies", hint: "Building or venue for staging dramatic performances and films", difficulty: 2 },
  { word: "DIRECTOR", category: "Movies", hint: "Key creative visionary guiding actors, cameras, and storytelling", difficulty: 2 },

  // 10. History & Civilizations (10)
  { word: "PYRAMID", category: "History", hint: "Monumental stone polyhedron erected by ancient Egyptian pharaohs", difficulty: 2 },
  { word: "EMPEROR", category: "History", hint: "Monarch wielding supreme sovereign authority over an empire", difficulty: 2 },
  { word: "DYNASTY", category: "History", hint: "Sequence of hereditary sovereigns from the same ancestral lineage", difficulty: 2 },
  { word: "RENAISSANCE", category: "History", hint: "European epoch marking rebirth of arts, humanism, and sciences", difficulty: 3 },
  { word: "COLOSSEUM", category: "History", hint: "Flavian oval amphitheater in Rome celebrated for gladiatorial games", difficulty: 3 },
  { word: "ARTIFACT", category: "History", hint: "Archaeological object of cultural or historical significance", difficulty: 2 },
  { word: "PHARAOH", category: "History", hint: "Supreme divine monarch of ancient dynastic Egypt", difficulty: 2 },
  { word: "CHRONICLE", category: "History", hint: "Documented factual narrative of events recorded sequentially in time", difficulty: 3 },
  { word: "KNIGHT", category: "History", hint: "Medieval armored mounted warrior serving under a feudal lord", difficulty: 1 },
  { word: "CASTLE", category: "History", hint: "Fortified medieval stronghold built to protect feudal nobility", difficulty: 1 },

  // 11. Language & Literature (10)
  { word: "METAPHOR", category: "Literature", hint: "Figure of speech creating direct imaginative equivalence between two ideas", difficulty: 2 },
  { word: "VOCABULARY", category: "Literature", hint: "Lexicon of words and linguistic phrases known by a communicator", difficulty: 3 },
  { word: "NARRATIVE", category: "Literature", hint: "Structured story conveying character arcs and thematic conflicts", difficulty: 3 },
  { word: "PARADOX", category: "Literature", hint: "Seemingly contradictory proposition that reveals an underlying truth", difficulty: 2 },
  { word: "ALLEGORY", category: "Literature", hint: "Story where characters and events symbolize broader moral meanings", difficulty: 2 },
  { word: "DIALOGUE", category: "Literature", hint: "Conversational exchange between two or more characters in drama", difficulty: 2 },
  { word: "PROVERB", category: "Literature", hint: "Short traditional pithy saying expressing common wisdom", difficulty: 2 },
  { word: "POETRY", category: "Literature", hint: "Literary art form employing meter, imagery, and evocative rhythm", difficulty: 1 },
  { word: "STANZA", category: "Literature", hint: "Group of lines forming the basic recurring unit in a poem", difficulty: 1 },
  { word: "AUTHOR", category: "Literature", hint: "Creator or originator of a written literary publication", difficulty: 1 },

  // 12. Medicine & Anatomy (10)
  { word: "ANTIBIOTIC", category: "Medicine", hint: "Pharmacological drug that inhibits or destroys bacterial pathogens", difficulty: 3 },
  { word: "HEMOGLOBIN", category: "Medicine", hint: "Iron-rich quaternary protein transporting cellular oxygen in erythrocytes", difficulty: 3 },
  { word: "NEURON", category: "Medicine", hint: "Electrically excitable cell transmitting neural signals across synapses", difficulty: 1 },
  { word: "VACCINE", category: "Medicine", hint: "Biological compound priming immune memory against virulent infections", difficulty: 2 },
  { word: "SKELETON", category: "Medicine", hint: "Rigid internal framework of mineralized bones sustaining bodily posture", difficulty: 2 },
  { word: "PEDIATRICS", category: "Medicine", hint: "Branch of medical clinical care addressing children and infants", difficulty: 3 },
  { word: "SYNAPSE", category: "Medicine", hint: "Microscopic gap across which neurotransmitter molecules diffuse", difficulty: 2 },
  { word: "GENOME", category: "Medicine", hint: "Complete biological instructions encoded within an organism's DNA", difficulty: 1 },
  { word: "HORMONE", category: "Medicine", hint: "Regulatory biochemical messenger secreted into circulatory blood", difficulty: 2 },
  { word: "IMMUNE", category: "Medicine", hint: "Host physiological defense network combating foreign antigens", difficulty: 1 },

  // 13. Music & Sound (10)
  { word: "HARMONY", category: "Music", hint: "Pleasing vertical combination of simultaneous musical chords", difficulty: 2 },
  { word: "ORCHESTRA", category: "Music", hint: "Expansive ensemble featuring strings, brass, woodwinds, and percussion", difficulty: 3 },
  { word: "MELODY", category: "Music", hint: "Linear progression of audible tones perceived as a coherent unit", difficulty: 1 },
  { word: "ACOUSTIC", category: "Music", hint: "Pertaining to physical sound waves produced without electrical amplification", difficulty: 2 },
  { word: "CRESCENDO", category: "Music", hint: "Gradual dynamic swell in auditory loudness across musical bars", difficulty: 3 },
  { word: "RHYTHM", category: "Music", hint: "Systematic recurring pulse and temporal cadence of acoustic notes", difficulty: 2 },
  { word: "TEMPO", category: "Music", hint: "Pace or metronome speed at which a musical passage is performed", difficulty: 1 },
  { word: "TREBLE", category: "Music", hint: "High-frequency auditory register represented by G clef", difficulty: 1 },
  { word: "CONCERT", category: "Music", hint: "Live musical performance presented before an attentive audience", difficulty: 2 },
  { word: "CHORUS", category: "Music", hint: "Repeated melodic refrain shared by vocalists in a composition", difficulty: 1 }
];

// Helper to scramble a word reliably
export function scrambleWord(word) {
  const letters = word.split("");
  let scrambled = "";
  let attempts = 0;

  do {
    const arr = [...letters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    scrambled = arr.join("");
    attempts++;
  } while (scrambled === word && attempts < 35);

  if (scrambled === word && letters.length > 1) {
    const arr = [...letters];
    [arr[0], arr[1]] = [arr[1], arr[0]];
    scrambled = arr.join("");
  }

  return scrambled;
}

// ==========================================
// 5. DECISION GAME DATA (easy scenarios plus the extended question bank)
// ==========================================
export const EASY_DECISION_SCENARIOS = [
  {
    id: "easy_001",
    category: "Daily Life",
    question: "You are leaving home and notice it has started raining. What is the sensible choice?",
    options: [
      { key: "A", text: "Take an umbrella or raincoat." },
      { key: "B", text: "Wear sunglasses and leave without checking the weather." },
      { key: "C", text: "Open all the windows at home." },
      { key: "D", text: "Carry a fan instead." }
    ],
    correctAnswer: "A",
    explanation: "An umbrella or raincoat helps you stay dry in the rain."
  },
  {
    id: "easy_002",
    category: "Student Life",
    question: "You have a test tomorrow but have not studied one chapter. What should you do first?",
    options: [
      { key: "A", text: "Play games all night." },
      { key: "B", text: "Make a short study plan and start with that chapter." },
      { key: "C", text: "Ignore the test completely." },
      { key: "D", text: "Hide the textbook." }
    ],
    correctAnswer: "B",
    explanation: "A short plan helps you use the remaining time well and focus on what you need most."
  },
  {
    id: "easy_003",
    category: "Technology",
    question: "Your phone battery is at 2% and you need to make an important call. What is the best choice?",
    options: [
      { key: "A", text: "Increase the screen brightness." },
      { key: "B", text: "Open several video apps." },
      { key: "C", text: "Charge the phone or use a power bank." },
      { key: "D", text: "Turn on the flashlight." }
    ],
    correctAnswer: "C",
    explanation: "Charging the phone gives it enough power for the important call."
  },
  {
    id: "easy_004",
    category: "Workplace",
    question: "You receive a task but do not understand the instructions. What should you do?",
    options: [
      { key: "A", text: "Guess and submit random work." },
      { key: "B", text: "Delete the task." },
      { key: "C", text: "Wait silently until the deadline passes." },
      { key: "D", text: "Ask a clear question before starting." }
    ],
    correctAnswer: "D",
    explanation: "Clarifying the task early prevents mistakes and saves time."
  },
  {
    id: "easy_005",
    category: "Health",
    question: "You feel thirsty after playing outside on a hot day. What is the sensible action?",
    options: [
      { key: "A", text: "Drink some water and rest in a cool place." },
      { key: "B", text: "Run in the sun for another hour." },
      { key: "C", text: "Wear a heavier jacket." },
      { key: "D", text: "Avoid all drinks." }
    ],
    correctAnswer: "A",
    explanation: "Water and a cool rest help your body recover from heat and activity."
  },
  {
    id: "easy_006",
    category: "Safety",
    question: "You see water spilled near an electrical socket. What should you do first?",
    options: [
      { key: "A", text: "Touch the socket to check it." },
      { key: "B", text: "Keep away and ask an adult or responsible person for help." },
      { key: "C", text: "Pour more water on it." },
      { key: "D", text: "Put a metal object in the socket." }
    ],
    correctAnswer: "B",
    explanation: "Water and electricity can be dangerous, so keeping away and getting help is safest."
  },
  {
    id: "easy_007",
    category: "Environment",
    question: "You finish a snack and see a dustbin nearby. What is the responsible choice?",
    options: [
      { key: "A", text: "Drop the wrapper on the road." },
      { key: "B", text: "Hide the wrapper under a chair." },
      { key: "C", text: "Put the wrapper in the dustbin." },
      { key: "D", text: "Throw it into a plant." }
    ],
    correctAnswer: "C",
    explanation: "Using the dustbin keeps the area clean and reduces litter."
  },
  {
    id: "easy_008",
    category: "Daily Life",
    question: "You need to reach school by 9:00 AM and the bus takes 30 minutes. When should you leave?",
    options: [
      { key: "A", text: "At 8:20 AM, leaving a few minutes for delay." },
      { key: "B", text: "At 9:30 AM." },
      { key: "C", text: "At noon." },
      { key: "D", text: "After the school day ends." }
    ],
    correctAnswer: "A",
    explanation: "Leaving at 8:20 gives enough time for the 30-minute trip and a small delay."
  },
  {
    id: "easy_009",
    category: "Planning",
    question: "You have two assignments due tomorrow and only enough time to finish one before dinner. What is the best first step?",
    options: [
      { key: "A", text: "Choose the assignment due earlier or needing more time, then plan the second one." },
      { key: "B", text: "Start both randomly and finish neither." },
      { key: "C", text: "Do the easiest one only, even if it is due next week." },
      { key: "D", text: "Wait until the deadline and hope the work becomes shorter." }
    ],
    correctAnswer: "A",
    explanation: "Checking urgency and effort helps you use limited time where it matters most."
  },
  {
    id: "easy_010",
    category: "Money",
    question: "A product costs 800 rupees and is discounted by 25%. What should you do to find the sale price?",
    options: [
      { key: "A", text: "Add 25% to 800." },
      { key: "B", text: "Find 25% of 800 and subtract it from 800." },
      { key: "C", text: "Multiply 800 by 25 and keep the result." },
      { key: "D", text: "Ignore the discount and pay double." }
    ],
    correctAnswer: "B",
    explanation: "A discount is subtracted from the original price; 25% of 800 is 200, so the price is 600 rupees."
  },
  {
    id: "easy_011",
    category: "Communication",
    question: "A friend sends you a message that sounds angry, but you are not sure what they mean. What is the wisest response?",
    options: [
      { key: "A", text: "Reply angrily immediately." },
      { key: "B", text: "Forward it to everyone." },
      { key: "C", text: "Ask politely what they meant before assuming." },
      { key: "D", text: "Delete the friendship without asking." }
    ],
    correctAnswer: "C",
    explanation: "A polite question prevents misunderstandings caused by short text messages."
  },
  {
    id: "easy_012",
    category: "Problem Solving",
    question: "Your internet stops working during an online class. What should you try first?",
    options: [
      { key: "A", text: "Check whether the router is connected and restart it if needed." },
      { key: "B", text: "Delete all your class notes." },
      { key: "C", text: "Buy a new laptop immediately." },
      { key: "D", text: "Keep clicking the same button forever." }
    ],
    correctAnswer: "A",
    explanation: "Checking the simple connection and restarting the router is a sensible first troubleshooting step."
  },
  {
    id: "easy_013",
    category: "Teamwork",
    question: "Your team is close to a deadline and one person is overloaded. What is the most helpful action?",
    options: [
      { key: "A", text: "Ignore the problem because it is not your task." },
      { key: "B", text: "Discuss priorities and share a task that you can complete well." },
      { key: "C", text: "Blame that person in the group chat." },
      { key: "D", text: "Delete the team's shared file." }
    ],
    correctAnswer: "B",
    explanation: "Sharing work after agreeing on priorities helps the team finish on time."
  }
];

export const SCENARIO_DECISION_SCENARIOS = [
  {
    id: "scenario_001",
    category: "Planning",
    question: "A group presentation is tomorrow. One teammate has not sent their slides, and you need time to combine everything. What is the best response?",
    options: [
      { key: "A", text: "Wait silently until the presentation begins." },
      { key: "B", text: "Send a clear deadline, prepare a backup outline, and offer focused help if needed." },
      { key: "C", text: "Remove the teammate without checking what happened." },
      { key: "D", text: "Create unrelated slides so everyone has more work." }
    ],
    correctAnswer: "B",
    explanation: "A clear deadline and backup plan protect the presentation while giving the teammate a fair chance to contribute."
  },
  {
    id: "scenario_002",
    category: "Money",
    question: "You planned to buy a required book, but a sale shows a cheaper accessory you do not need. What should guide your decision?",
    options: [
      { key: "A", text: "Buy the accessory because any discount is automatically a saving." },
      { key: "B", text: "Borrow money and buy both immediately." },
      { key: "C", text: "Buy the required book first and keep the remaining money for essentials." },
      { key: "D", text: "Choose the most expensive item to get better value." }
    ],
    correctAnswer: "C",
    explanation: "A discount only helps when the item is needed; essential priorities should come before optional spending."
  },
  {
    id: "scenario_003",
    category: "Communication",
    question: "A message in your team chat blames you for a delay, but the timeline shows both people contributed. What should you do?",
    options: [
      { key: "A", text: "Reply with another accusation in the same chat." },
      { key: "B", text: "Ignore it and let the misunderstanding grow." },
      { key: "C", text: "Delete the shared project." },
      { key: "D", text: "Share the timeline calmly and suggest a private discussion to fix the process." }
    ],
    correctAnswer: "D",
    explanation: "Facts and a private discussion reduce conflict while keeping the team focused on solving the delay."
  },
  {
    id: "scenario_004",
    category: "Safety",
    question: "You smell gas in the kitchen but cannot see a leak. What is the safest immediate action?",
    options: [
      { key: "A", text: "Do not use switches or flames, leave the area, and contact an adult or emergency service." },
      { key: "B", text: "Turn on a fan by using the wall switch." },
      { key: "C", text: "Search for the leak with a lighter." },
      { key: "D", text: "Ignore it if the smell becomes weaker." }
    ],
    correctAnswer: "A",
    explanation: "A spark can ignite gas, so leaving safely and getting professional help is the correct priority."
  },
  {
    id: "scenario_005",
    category: "Problem Solving",
    question: "A printer stops working just before an important submission. It has paper, but shows a connection error. What should you try first?",
    options: [
      { key: "A", text: "Replace every part of the printer immediately." },
      { key: "B", text: "Check the cable or network connection, then restart the print job." },
      { key: "C", text: "Keep sending the same job without checking anything." },
      { key: "D", text: "Delete the document and start from memory." }
    ],
    correctAnswer: "B",
    explanation: "The error points to connectivity, so checking the connection is a focused first test before bigger changes."
  },
  {
    id: "scenario_006",
    category: "Teamwork",
    question: "Two teammates suggest different ways to finish a task, and the deadline is close. How should the team decide?",
    options: [
      { key: "A", text: "Choose the idea from the loudest person." },
      { key: "B", text: "Try both complete approaches even if neither finishes on time." },
      { key: "C", text: "Compare both against the deadline and requirements, then choose the workable one." },
      { key: "D", text: "Postpone the task until everyone agrees perfectly." }
    ],
    correctAnswer: "C",
    explanation: "Comparing ideas against clear constraints leads to a practical decision instead of a popularity contest."
  },
  {
    id: "scenario_007",
    category: "Health",
    question: "You feel dizzy during exercise and still have several minutes left in your plan. What should you do?",
    options: [
      { key: "A", text: "Stop, rest, drink water if appropriate, and tell a responsible person." },
      { key: "B", text: "Exercise harder to finish faster." },
      { key: "C", text: "Hide the symptom so nobody interrupts." },
      { key: "D", text: "Take an unknown medicine from someone nearby." }
    ],
    correctAnswer: "A",
    explanation: "A warning symptom matters more than completing the plan; stopping and getting help reduces risk."
  },
  {
    id: "scenario_008",
    category: "Environment",
    question: "Your class can either print 100 single-use notices or share one digital notice and print only a few copies. What is the better choice?",
    options: [
      { key: "A", text: "Print 100 copies so nobody has to read a message online." },
      { key: "B", text: "Share the digital notice and print only for people who need paper access." },
      { key: "C", text: "Print both versions without checking how many are needed." },
      { key: "D", text: "Cancel the notice completely." }
    ],
    correctAnswer: "B",
    explanation: "A digital-first approach reduces waste while still keeping a paper option for people who need it."
  },
  {
    id: "scenario_009",
    category: "Technology",
    question: "You receive a message asking for your login code through an unfamiliar link. What should you do?",
    options: [
      { key: "A", text: "Share the code quickly before it expires." },
      { key: "B", text: "Open the link on every device to compare it." },
      { key: "C", text: "Do not share the code, verify through the official app, and report the message." },
      { key: "D", text: "Forward the message to friends so they can test it." }
    ],
    correctAnswer: "C",
    explanation: "Unexpected code requests are a common phishing signal; verify through a trusted channel instead."
  },
  {
    id: "scenario_010",
    category: "Time Management",
    question: "You have one hour, a task worth most of your marks, and two small optional tasks. What is the strongest plan?",
    options: [
      { key: "A", text: "Finish the high-value task first, then use remaining time for the small tasks." },
      { key: "B", text: "Spend the whole hour decorating the submission." },
      { key: "C", text: "Start all three and switch every five minutes." },
      { key: "D", text: "Do the optional tasks first because they feel easier." }
    ],
    correctAnswer: "A",
    explanation: "Prioritising by value protects the most important outcome when time is limited."
  }
];

export const DECISION_PLAY_POOL = [
  ...EASY_DECISION_SCENARIOS,
  ...SCENARIO_DECISION_SCENARIOS
];

export const DECISION_SCENARIOS = [
  // --- CATEGORY 1: TECHNOLOGY, SOFTWARE & NETWORKING (15 scenarios) ---
  {
    id: "tech_001",
    category: "Technology",
    question: "A critical production payment microservice crashes during peak flash-sale traffic. You have an unverified hotfix from a junior developer and an established database rollback snapshot that will lose the last 2 minutes of queued pending carts. What is the optimal decision?",
    options: [
      { key: "A", text: "Deploy the unverified hotfix directly into production to avoid losing any queued carts." },
      { key: "B", text: "Execute the rollback snapshot to restore system stability, then replay missing transactions from message logs." },
      { key: "C", text: "Shut down all web traffic for the next 4 hours while senior staff conduct a complete code rewrite." },
      { key: "D", text: "Ignore the downtime alert and let Kubernetes auto-restart the failing pods indefinitely." }
    ],
    correctAnswer: "B",
    explanation: "Restoring the known stable state stops cascading revenue loss, while transaction logs enable deterministic data reconciliation."
  },
  {
    id: "tech_002",
    category: "Technology",
    question: "Your team discovers that an automated script has been accidentally printing plaintext user passwords into an internal Elasticsearch debug log for 48 hours. What is your immediate protocol?",
    options: [
      { key: "A", text: "Silently delete the logs and hope no internal employees noticed the entries." },
      { key: "B", text: "Immediately halt the logging script, purge affected log indexes, force-rotate impacted credentials, and file a formal security incident." },
      { key: "C", text: "Post the affected log file in the general Slack channel so everyone knows what happened." },
      { key: "D", text: "Wait until next sprint's planning meeting to schedule a backlog cleanup ticket." }
    ],
    correctAnswer: "B",
    explanation: "Immediate containment, credential invalidation, and incident disclosure prevent lateral compromise and fulfill compliance obligations."
  },
  {
    id: "tech_003",
    category: "Technology",
    question: "A third-party authentication API suddenly returns HTTP 504 Gateway Timeouts for 30% of logins. What architecture pattern best protects your users' experience?",
    options: [
      { key: "A", text: "Implement a circuit breaker with exponential backoff and provide fallback cached session tokens." },
      { key: "B", text: "Bombard the third-party endpoint with infinite retry loops every 5 milliseconds." },
      { key: "C", text: "Disable authentication completely and give full administrative access to everyone." },
      { key: "D", text: "Show a blank white screen until the vendor service recovers." }
    ],
    correctAnswer: "A",
    explanation: "Circuit breakers prevent cascading thread exhaustion, while exponential backoff gives upstream vendors room to recover."
  },
  {
    id: "tech_004",
    category: "Technology",
    question: "Two senior architects are locked in debate: one insists on GraphQL for all mobile views, while the other demands standard REST. The release timeline is delayed by two weeks. How should engineering leadership resolve this?",
    options: [
      { key: "A", text: "Side with whichever architect has more years of tenure at the company." },
      { key: "B", text: "Define objective criteria (payload size, caching needs, client complexity, delivery deadline) and run a 2-day proof-of-concept." },
      { key: "C", text: "Build both architectures completely and maintain two parallel backends forever." },
      { key: "D", text: "Cancel the mobile application project entirely." }
    ],
    correctAnswer: "B",
    explanation: "Objective weighted criteria and timeboxed empirical validation resolve architectural stalemates without organizational politics."
  },
  {
    id: "tech_005",
    category: "Technology",
    question: "A security scanner identifies a critical Zero-Day remote code execution vulnerability in an open-source library your team uses. No official patch exists yet. What is the best immediate mitigation?",
    options: [
      { key: "A", text: "Apply a web application firewall (WAF) rule to block exploit payloads and isolate or stub the affected module." },
      { key: "B", text: "Disable the security scanner so management doesn't panic." },
      { key: "C", text: "Wait 3 weeks until the open-source community releases a major version update." },
      { key: "D", text: "Tweet about the vulnerability publicly before your servers are patched." }
    ],
    correctAnswer: "A",
    explanation: "WAF virtual patching and module isolation break the attack vector immediately while developers prepare permanent fixes."
  },
  {
    id: "tech_006",
    category: "Technology",
    question: "Your machine learning recommendation model shows 98% accuracy on test data, but in production, user engagement drops by 20%. What is the most likely root cause to investigate first?",
    options: [
      { key: "A", text: "Data leakage or train-serving skew where production input features differ from offline training distributions." },
      { key: "B", text: "Users are intentionally boycotting the app." },
      { key: "C", text: "The server CPU clock speed is running too fast." },
      { key: "D", text: "Rewrite the entire frontend in a new JavaScript framework." }
    ],
    correctAnswer: "A",
    explanation: "Train-serving skew and data leakage create artificially inflated offline metrics that collapse when exposed to real-world distributions."
  },
  {
    id: "tech_007",
    category: "Technology",
    question: "Your cloud database costs spike by 400% over a weekend. You discover a newly merged feature runs an unindexed N+1 query on every homepage load. How do you triage this?",
    options: [
      { key: "A", text: "Roll back the release or feature flag the homepage query immediately, then add proper database indexes and eager loading." },
      { key: "B", text: "Ask finance for an emergency budget increase without modifying the code." },
      { key: "C", text: "Turn off database logging to conceal the queries." },
      { key: "D", text: "Instruct users to visit the site only once per week." }
    ],
    correctAnswer: "A",
    explanation: "Feature flags and rollbacks contain cloud financial bleed within minutes, allowing clean batching and indexing in staging."
  },
  {
    id: "tech_008",
    category: "Technology",
    question: "During a distributed systems migration, you must choose between strong consistency (CP) or high availability (AP) for a banking ledger. Which choice is required according to the CAP theorem?",
    options: [
      { key: "A", text: "Consistency and Partition Tolerance (CP): Financial ledgers cannot tolerate split-brain balance discrepancies." },
      { key: "B", text: "Availability only: Allow negative balances and duplicate withdrawals whenever partitions occur." },
      { key: "C", text: "CAP theorem does not apply to modern cloud databases." },
      { key: "D", text: "Neither: Delete ledger data periodically to save storage space." }
    ],
    correctAnswer: "A",
    explanation: "Financial systems require absolute mathematical consistency; stale or contradictory ledger states cause irreversible fiscal loss."
  },
  {
    id: "tech_009",
    category: "Technology",
    question: "A developer notices their local git branch is 40 commits behind main with 12 conflicting files. What is the cleanest, least destructive command flow?",
    options: [
      { key: "A", text: "Create a backup branch, fetch origin, and rebase interactively on main while resolving conflicts step by step." },
      { key: "B", text: "Force push with --force to overwrite main and delete everyone else's commits." },
      { key: "C", text: "Delete their computer hard drive." },
      { key: "D", text: "Copy code into an email and send it to the CEO." }
    ],
    correctAnswer: "A",
    explanation: "Branch backups combined with structured interactive rebasing preserve clean linear history while protecting team members from destructive overwrites."
  },
  {
    id: "tech_010",
    category: "Technology",
    question: "A DDoS attack floods your web API with 10 million SYN requests per second, exhausting server TCP connection tables. What infrastructure mitigation is most effective?",
    options: [
      { key: "A", text: "Enable SYN cookies on the kernel and route inbound edge traffic through an Anycast scrubbing network." },
      { key: "B", text: "Unplug the server power cable permanently." },
      { key: "C", text: "Increase server RAM from 16GB to 32GB without changing network filters." },
      { key: "D", text: "Reply with apologies to every IP address." }
    ],
    correctAnswer: "A",
    explanation: "SYN cookies eliminate half-open state allocation in kernel memory, while Anycast distributes attack volume across global scrubbing centers."
  },
  {
    id: "tech_011",
    category: "Technology",
    question: "Your team needs to migrate a 50-terabyte production database to a new cloud region with zero customer-visible downtime. What migration pattern achieves this?",
    options: [
      { key: "A", text: "Establish Change Data Capture (CDC) replication from old to new DB, verify lag reaches zero, then flip DNS/load balancer." },
      { key: "B", text: "Turn off the old database for 5 days and export a giant CSV file." },
      { key: "C", text: "Tell customers their accounts will be deleted and they must re-register." },
      { key: "D", text: "Copy tables manually by typing them into spreadsheets." }
    ],
    correctAnswer: "A",
    explanation: "CDC real-time streaming ensures zero-data-loss replica convergence, enabling instantaneous atomic traffic cutover."
  },
  {
    id: "tech_012",
    category: "Technology",
    question: "Why should cryptographic passwords NEVER be hashed with fast algorithms like MD5 or plain SHA-256?",
    options: [
      { key: "A", text: "Modern GPUs can compute billions of SHA-256 hashes per second, making rainbow table and brute-force cracking trivial without work-factor salts like Argon2 or bcrypt." },
      { key: "B", text: "SHA-256 only works on numbers, not letters." },
      { key: "C", text: "MD5 was outlawed by the United Nations." },
      { key: "D", text: "Fast hashes always delete passwords after 24 hours." }
    ],
    correctAnswer: "A",
    explanation: "Memory-hard and intentionally slow key derivation functions (Argon2id, bcrypt) drastically inflate offline cracking costs for attackers."
  },
  {
    id: "tech_013",
    category: "Technology",
    question: "An engineer wants to optimize front-end initial load performance for a Single Page Application (SPA). Which architectural lever yields the highest impact?",
    options: [
      { key: "A", text: "Route-based dynamic code splitting, critical CSS inlining, and aggressive image optimization with WebP and srcset." },
      { key: "B", text: "Bundling all 120MB of node_modules into a single blocking vendor.js file." },
      { key: "C", text: "Removing all CSS and rendering plain browser text." },
      { key: "D", text: "Increasing browser zoom to 200%." }
    ],
    correctAnswer: "A",
    explanation: "Code splitting ensures clients only download the minimal JavaScript required for the initial viewport, slashing Time to Interactive."
  },
  {
    id: "tech_014",
    category: "Technology",
    question: "What is the primary danger of running microservices without distributed tracing (e.g. OpenTelemetry)?",
    options: [
      { key: "A", text: "In distributed networks, request latency bottlenecks and intermittent cascading failures across 20+ services become impossible to isolate." },
      { key: "B", text: "Microservices will immediately catch on fire." },
      { key: "C", text: "Browsers will refuse to render HTML." },
      { key: "D", text: "Databases cannot store JSON without tracing." }
    ],
    correctAnswer: "A",
    explanation: "Distributed tracing propagates correlation IDs across asynchronous RPC hops, pinpointing exact spans where regressions occur."
  },
  {
    id: "tech_015",
    category: "Technology",
    question: "A mobile application experiences random crashes on 2% of devices. The stack trace indicates a NullPointerDereference in an asynchronous callback. How to resolve it defensively?",
    options: [
      { key: "A", text: "Check weak reference lifecycles, guard callback execution with null-safety checks, and ensure background threads do not mutate destroyed UI contexts." },
      { key: "B", text: "Wrap the entire application in an empty try/catch that hides all exceptions." },
      { key: "C", text: "Remove the feature entirely and blame the device manufacturer." },
      { key: "D", text: "Tell users to never rotate their screen." }
    ],
    correctAnswer: "A",
    explanation: "Asynchronous tasks outliving UI components leak context or dereference detached view controllers; lifecycle awareness prevents null pointer crashes."
  },

  // --- CATEGORY 2: MOVIES & ENTERTAINMENT (13 scenarios) ---
  {
    id: "mov_001",
    category: "Movies",
    question: "In Christopher Nolan's 'Interstellar', why does 1 hour on Miller's Planet equal 7 years on Earth?",
    options: [
      { key: "A", text: "Extreme gravitational time dilation caused by the immense mass of the supermassive black hole Gargantua." },
      { key: "B", text: "The planet's atmosphere reflects cosmic radiation backwards." },
      { key: "C", text: "Their spacecraft's onboard clock was damaged during entry." },
      { key: "D", text: "Miller's Planet orbits faster than the speed of light." }
    ],
    correctAnswer: "A",
    explanation: "Einstein's General Relativity dictates that intense gravitational fields cause spacetime curvature, slowing the passage of time relative to distant observers."
  },
  {
    id: "mov_002",
    category: "Movies",
    question: "A film production studio discovers midway through shooting that test audiences find the lead character completely unsympathetic. What is the most effective narrative remedy?",
    options: [
      { key: "A", text: "Introduce a clear moral vulnerability, an authentic motive, or a 'Save the Cat' compassionate moment early in Act 1." },
      { key: "B", text: "Add louder explosions and more CGI monsters in the final battle." },
      { key: "C", text: "Blame the test audience and release the movie unchanged." },
      { key: "D", text: "Cut all dialogue so the character never speaks." }
    ],
    correctAnswer: "A",
    explanation: "Audience empathy is rooted in relatable desires, vulnerabilities, or ethical choices established early in the story arc."
  },
  {
    id: "mov_003",
    category: "Movies",
    question: "In the film 'The Matrix', what does Neo taking the Red Pill symbolize in philosophical literature?",
    options: [
      { key: "A", text: "Choosing uncomfortable, challenging truth and self-awareness over blissful, artificial ignorance." },
      { key: "B", text: "Submitting to authoritarian robotic governance." },
      { key: "C", text: "A desire to become a computer programmer." },
      { key: "D", text: "An endorsement of virtual reality video games." }
    ],
    correctAnswer: "A",
    explanation: "The Red Pill mirrors Plato's Allegory of the Cave: confronting jarring, unvarnished reality rather than living inside comforting illusions."
  },
  {
    id: "mov_004",
    category: "Movies",
    question: "What cinematic camera technique did Alfred Hitchcock pioneer in 'Vertigo' to convey psychological disorientation and acrophobia?",
    options: [
      { key: "A", text: "The Dolly Zoom (pushing the camera forward while simultaneously zooming out)." },
      { key: "B", text: "Pure night-vision handheld recording." },
      { key: "C", text: "High-speed 120 FPS slow motion throughout the film." },
      { key: "D", text: "Strobe lighting combined with static widescreen shots." }
    ],
    correctAnswer: "A",
    explanation: "The Dolly Zoom distorts perspective by keeping foreground scale constant while radically shrinking or expanding background depth."
  },
  {
    id: "mov_005",
    category: "Movies",
    question: "In cinema production, what is the primary role of a 'Foley Artist'?",
    options: [
      { key: "A", text: "Re-creating and recording everyday sound effects (footsteps, fabric rustle, glass clinking) in sync with footage." },
      { key: "B", text: "Designing the promotional movie posters and merchandise." },
      { key: "C", text: "Directing the stunt doubles during high-risk scenes." },
      { key: "D", text: "Financing the production budget through corporate partnerships." }
    ],
    correctAnswer: "A",
    explanation: "Foley artists use physical props in sound studios to generate realistic acoustic textures that location microphones fail to capture."
  },
  {
    id: "mov_006",
    category: "Movies",
    question: "In 'The Shawshank Redemption', what strategy allowed Andy Dufresne to preserve his sanity and hope across two decades of imprisonment?",
    options: [
      { key: "A", text: "Cultivating quiet discipline, intellectual mastery, geology, and playing the long game with patient incremental effort." },
      { key: "B", text: "Starting violent riots against the prison guards." },
      { key: "C", text: "Accepting his sentence and giving up all desire for freedom." },
      { key: "D", text: "Refusing to speak with any other inmates." }
    ],
    correctAnswer: "A",
    explanation: "Andy's stoic patience, mental enrichment (the library), and discreet persistence epitomize resilient long-term problem solving."
  },
  {
    id: "mov_007",
    category: "Movies",
    question: "What makes the screenwriting concept of 'Chekhov's Gun' essential to compelling storytelling?",
    options: [
      { key: "A", text: "Every element introduced in a story must have purposeful narrative significance later; irrelevant details should be removed." },
      { key: "B", text: "Every action scene must feature firearms." },
      { key: "C", text: "The protagonist must always win in the first chapter." },
      { key: "D", text: "Films should never have plot twists." }
    ],
    correctAnswer: "A",
    explanation: "Chekhov's principle states that if a rifle hangs on the wall in Act 1, it must fire in Act 2 or 3; superfluous elements break audience trust."
  },
  {
    id: "mov_008",
    category: "Movies",
    question: "In Hayao Miyazaki's 'Spirited Away', how does Chihiro regain her identity and rescue her parents?",
    options: [
      { key: "A", text: "Through humility, hard work, kindness, and remembering her true name and connection to nature." },
      { key: "B", text: "By using magical combat weapons against the bathhouse owners." },
      { key: "C", text: "By accumulating gold nuggets provided by No-Face." },
      { key: "D", text: "By running away and abandoning her family." }
    ],
    correctAnswer: "A",
    explanation: "Miyazaki highlights character growth through diligence, integrity, and cultural memory rather than superficial power or violence."
  },
  {
    id: "mov_009",
    category: "Movies",
    question: "In visual film editing, what is the 'Kuleshov Effect'?",
    options: [
      { key: "A", text: "A cognitive effect where viewers derive more meaning from the interaction of two sequential shots than from a single shot in isolation." },
      { key: "B", text: "The use of bright blue filters to simulate daytime." },
      { key: "C", text: "Adding subtitles in two languages simultaneously." },
      { key: "D", text: "Speeding up video footage by 200%." }
    ],
    correctAnswer: "A",
    explanation: "Soviet filmmaker Lev Kuleshov proved that juxtaposing a neutral face with soup, a casket, or a child prompts audiences to project hunger, grief, or affection."
  },
  {
    id: "mov_010",
    category: "Movies",
    question: "What is the primary narrative purpose of the 'Hero's Journey' (Monomyth) outlined by Joseph Campbell?",
    options: [
      { key: "A", text: "A universal storytelling framework reflecting human psychological maturation: Departure, Initiation, and Return transformed." },
      { key: "B", text: "A formula ensuring all movies have superhero characters." },
      { key: "C", text: "A copyright document owned by Hollywood studios." },
      { key: "D", text: "A guide for writing video game instruction booklets." }
    ],
    correctAnswer: "A",
    explanation: "Campbell showed that myths across continents share the Monomyth cycle, mirroring internal psychological growth and individuation."
  },
  {
    id: "mov_011",
    category: "Movies",
    question: "Why did director Stanley Kubrick use classical music (Strauss, Ligeti) instead of a traditional sci-fi score in '2001: A Space Odyssey'?",
    options: [
      { key: "A", text: "To evoke grandeur, timeless cosmic elegance, and philosophical majesty beyond contemporary technological clichés." },
      { key: "B", text: "Because classical music was royalty-free and saved budget." },
      { key: "C", text: "The original audio recordings were lost in an airport." },
      { key: "D", text: "Classical music was the only music allowed in England in 1968." }
    ],
    correctAnswer: "A",
    explanation: "Pairing Johann Strauss's waltz with orbital space stations created an iconic visual ballet of human technological evolution."
  },
  {
    id: "mov_012",
    category: "Movies",
    question: "In screenwriting, what differentiates an active protagonist from a passive protagonist?",
    options: [
      { key: "A", text: "Active protagonists make deliberate choices that drive plot consequences; passive protagonists merely react to events around them." },
      { key: "B", text: "Active protagonists run in every scene; passive protagonists sit down." },
      { key: "C", text: "Active protagonists never make mistakes." },
      { key: "D", text: "Passive protagonists always die in Act 1." }
    ],
    correctAnswer: "A",
    explanation: "Compelling narratives require protagonists whose desires, flaws, and proactive decisions directly cause story turning points."
  },
  {
    id: "mov_013",
    category: "Movies",
    question: "What is the function of the 'MacGuffin' in Alfred Hitchcock's thrillers?",
    options: [
      { key: "A", text: "An object, device, or secret that serves as a trigger for plot motivation, though its exact nature is of little consequence to the audience." },
      { key: "B", text: "A comedic character who provides relief during tense scenes." },
      { key: "C", text: "The main villain's secret weapon." },
      { key: "D", text: "The name of Hitchcock's production company." }
    ],
    correctAnswer: "A",
    explanation: "The MacGuffin (e.g. secret microfilm or glowing briefcase) fuels character conflict, but emotional stakes reside in character dynamics."
  },

  // --- CATEGORY 3: GENERAL KNOWLEDGE & SCIENCE (13 scenarios) ---
  {
    id: "gk_001",
    category: "General Knowledge",
    question: "Why does the human body require dietary Iron, and what biological catastrophe occurs if it is severely deficient?",
    options: [
      { key: "A", text: "Iron synthesizes hemoglobin to bind oxygen in red blood cells; deficiency causes anemia, fatigue, and tissue hypoxia." },
      { key: "B", text: "Iron strengthens fingernails only; deficiency causes no internal harm." },
      { key: "C", text: "Iron neutralizes stomach acids to prevent ulcers." },
      { key: "D", text: "Iron converts sunlight into vitamin D in skin cells." }
    ],
    correctAnswer: "A",
    explanation: "Heme iron forms the core coordination complex of hemoglobin, enabling blood to transport cellular oxygen from lungs to vital organs."
  },
  {
    id: "gk_002",
    category: "General Knowledge",
    question: "What fundamental scientific phenomenon causes the Earth to experience four distinct annual seasons?",
    options: [
      { key: "A", text: "The 23.5-degree axial tilt of the Earth relative to its orbital plane around the Sun." },
      { key: "B", text: "Fluctuations in the Earth's distance from the Sun as its orbit stretches." },
      { key: "C", text: "Periodic volcanic ash clouds blocking solar radiation." },
      { key: "D", text: "The gravitational pull of Jupiter pulling Earth away from solar rays." }
    ],
    correctAnswer: "A",
    explanation: "The fixed axial tilt changes the angle of solar incidence and day length across hemispheres as Earth completes its yearly revolution."
  },
  {
    id: "gk_003",
    category: "General Knowledge",
    question: "What is the economic concept of 'Opportunity Cost'?",
    options: [
      { key: "A", text: "The value of the next best alternative given up when making a particular choice." },
      { key: "B", text: "The total sales tax paid on a purchase." },
      { key: "C", text: "The cost of building a new office building." },
      { key: "D", text: "The discount offered during clearance sales." }
    ],
    correctAnswer: "A",
    explanation: "Opportunity cost measures forgone benefit: every hour or dollar spent on one project cannot be invested into another venture."
  },
  {
    id: "gk_004",
    category: "General Knowledge",
    question: "Why does water expand when it freezes into ice, unlike almost all other chemical compounds?",
    options: [
      { key: "A", text: "Hydrogen bonds arrange molecules into a rigid, open hexagonal crystal lattice that is less dense than liquid water." },
      { key: "B", text: "Trapped air bubbles push water molecules apart violently." },
      { key: "C", text: "Thermal contraction forces ice atoms to split." },
      { key: "D", text: "Ice absorbs gravity and expands upward." }
    ],
    correctAnswer: "A",
    explanation: "Water's anomalous expansion preserves aquatic ecosystems by allowing floating ice sheets to insulate underlying liquid water."
  },
  {
    id: "gk_005",
    category: "General Knowledge",
    question: "Which layer of the Earth's atmosphere absorbs the vast majority of harmful ultraviolet (UV-B) radiation from the Sun?",
    options: [
      { key: "A", text: "The Stratospheric Ozone Layer (O3)." },
      { key: "B", text: "The Tropospheric moisture cloud layer." },
      { key: "C", text: "The Exosphere hydrogen fringe." },
      { key: "D", text: "The Ionosphere radio wave bounce layer." }
    ],
    correctAnswer: "A",
    explanation: "Ozone molecules absorb high-energy UV photons, splitting into O2 and free oxygen atoms, protecting surface life from DNA mutations."
  },
  {
    id: "gk_006",
    category: "General Knowledge",
    question: "What is the primary objective of a central bank when it raises benchmark interest rates?",
    options: [
      { key: "A", text: "Cool down an overheating economy and curb high inflation by increasing the cost of borrowing." },
      { key: "B", text: "Force commercial banks to give free money to customers." },
      { key: "C", text: "Stimulate maximum immediate consumer spending." },
      { key: "D", text: "Weaken the national currency relative to foreign currencies." }
    ],
    correctAnswer: "A",
    explanation: "Higher borrowing costs dampen excessive credit expansion and discretionary spending, reducing aggregate demand to stabilize price levels."
  },
  {
    id: "gk_007",
    category: "General Knowledge",
    question: "What makes carbon the fundamental structural element for all known terrestrial organic life?",
    options: [
      { key: "A", text: "Its four valence electrons allow it to form versatile, stable covalent bonds with diverse elements including itself." },
      { key: "B", text: "It is the heaviest element in the periodic table." },
      { key: "C", text: "It emits radioactive warmth that powers cells." },
      { key: "D", text: "It cannot be dissolved in water under any condition." }
    ],
    correctAnswer: "A",
    explanation: "Carbon's tetravalence enables vast chemical complexity: linear chains, aromatic rings, polymers, DNA backbones, and complex enzymes."
  },
  {
    id: "gk_008",
    category: "General Knowledge",
    question: "What was the landmark significance of the 1944 Bretton Woods Conference?",
    options: [
      { key: "A", text: "Establishing the International Monetary Fund (IMF), World Bank, and pegged foreign exchange systems after WWII." },
      { key: "B", text: "Drafting the original patent for the steam engine." },
      { key: "C", text: "Signing the Treaty of Versailles ending World War I." },
      { key: "D", text: "Creating the European Union common currency." }
    ],
    correctAnswer: "A",
    explanation: "Bretton Woods created the modern global financial architecture to ensure international monetary stability and postwar reconstruction."
  },
  {
    id: "gk_009",
    category: "General Knowledge",
    question: "How does the human immune system develop long-lasting immunity after recovering from a viral infection?",
    options: [
      { key: "A", text: "Memory B-cells and memory T-cells persist for years, rapidly synthesizing specific antibodies upon re-exposure." },
      { key: "B", text: "Blood turns into antibiotic liquid permanently." },
      { key: "C", text: "The virus becomes a permanent part of normal skin cells." },
      { key: "D", text: "Red blood cells learn to eat viruses directly." }
    ],
    correctAnswer: "A",
    explanation: "Adaptive immune memory differentiates naive lymphocytes into long-lived memory clones capable of neutralizing antigens before illness occurs."
  },
  {
    id: "gk_010",
    category: "General Knowledge",
    question: "What causes the phenomenon known as 'Ocean Acidification'?",
    options: [
      { key: "A", text: "Excess atmospheric CO2 dissolving into seawater, forming carbonic acid that lowers pH and depletes carbonate ions for corals and shells." },
      { key: "B", text: "Oil spills from cargo tankers dissolving in water." },
      { key: "C", text: "Plastic bottles releasing vinegar into oceans." },
      { key: "D", text: "Undersea volcanoes erupting table salt." }
    ],
    correctAnswer: "A",
    explanation: "Seawater absorbs ~30% of anthropogenic carbon dioxide, producing H+ ions that reduce ocean alkalinity and dissolve calcium carbonate shells."
  },
  {
    id: "gk_011",
    category: "General Knowledge",
    question: "What is the psychological principle behind the 'Dunning-Kruger Effect'?",
    options: [
      { key: "A", text: "People with low competence in a domain tend to overestimate their ability, while experts often underestimate their relative expertise." },
      { key: "B", text: "People always remember their childhood better than yesterday." },
      { key: "C", text: "Smart people never make mistakes in public." },
      { key: "D", text: "Memory improves when people are angry." }
    ],
    correctAnswer: "A",
    explanation: "Novices lack the metacognitive awareness required to recognize their own errors, creating illusory superiority until knowledge increases."
  },
  {
    id: "gk_012",
    category: "General Knowledge",
    question: "Why do astronauts experience 'weightlessness' while orbiting inside the International Space Station (ISS)?",
    options: [
      { key: "A", text: "They are in perpetual free fall around Earth; Earth's gravity is still ~90% as strong at that altitude, but centrifugal forward velocity matches fall rate." },
      { key: "B", text: "There is zero gravity anywhere in space above 100 miles." },
      { key: "C", text: "The space station has anti-gravity shielding plates." },
      { key: "D", text: "Their spacesuits repel Earth's magnetic core." }
    ],
    correctAnswer: "A",
    explanation: "Orbiting is continuous freefall: the ISS falls toward Earth at the exact rate the planet's surface curves away beneath it (~17,500 mph)."
  },
  {
    id: "gk_013",
    category: "General Knowledge",
    question: "What is the primary difference between nuclear fission and nuclear fusion?",
    options: [
      { key: "A", text: "Fission splits heavy atomic nuclei (like Uranium); fusion forces light nuclei (like Hydrogen) together under extreme heat and pressure." },
      { key: "B", text: "Fission only happens on the Sun; fusion only happens in nuclear reactors." },
      { key: "C", text: "Fusion creates toxic radioactive waste for 100,000 years, while fission creates water." },
      { key: "D", text: "Fission absorbs energy; fusion uses cold ice." }
    ],
    correctAnswer: "A",
    explanation: "Fission releases binding energy by splitting actinides; fusion powers stars by combining isotopes of hydrogen into helium."
  },

  // --- CATEGORY 4: WORKPLACE & PROFESSIONAL (13 scenarios) ---
  {
    id: "work_001",
    category: "Workplace",
    question: "You have three high-priority deliverables due by 5:00 PM today, but an unexpected blocking bug means you realistically only have capacity to finish two. How do you handle this trade-off?",
    options: [
      { key: "A", text: "Triage deliverables by business impact, inform key stakeholders before midday, and negotiate a revised deadline." },
      { key: "B", text: "Rush through all three by skipping QA testing, code review, and documentation." },
      { key: "C", text: "Turn off notifications, say nothing, and submit whatever is half-finished at 4:59 PM." },
      { key: "D", text: "Log off early and blame your internet provider tomorrow morning." }
    ],
    correctAnswer: "A",
    explanation: "Proactive communication and impact-based triage manage expectations, preserve quality, and demonstrate professional ownership."
  },
  {
    id: "work_002",
    category: "Workplace",
    question: "A junior colleague repeatedly interrupts and speaks over others during cross-functional sprint reviews. As their peer, what is the most constructive response?",
    options: [
      { key: "A", text: "Offer private, empathetic 1-on-1 feedback with specific examples of the behavior and suggestions for active listening." },
      { key: "B", text: "Loudly mock and scold them in front of the entire client team to teach them a lesson." },
      { key: "C", text: "Completely exclude them from all future project calendar invites without explanation." },
      { key: "D", text: "Post passive-aggressive complaints on social media." }
    ],
    correctAnswer: "A",
    explanation: "Private, behavior-focused feedback allows peers to course-correct with dignity without eroding team psychological safety."
  },
  {
    id: "work_003",
    category: "Workplace",
    question: "Your project manager asks you to provide an estimate for a completely new feature involving unverified machine learning APIs. How should you estimate responsibly?",
    options: [
      { key: "A", text: "Break the project into phases: allocate a 3-day research spike to test API feasibility, then provide a confident range with explicit assumptions." },
      { key: "B", text: "Promise it will take exactly 4 hours to impress your manager without researching." },
      { key: "C", text: "Refuse to give any estimate ever because technology is unpredictable." },
      { key: "D", text: "Quote 18 months so you never have to work under pressure." }
    ],
    correctAnswer: "A",
    explanation: "A timeboxed research spike derisks technical unknowns before committing to business deadlines, avoiding false commitments."
  },
  {
    id: "work_004",
    category: "Workplace",
    question: "You accidentally run a SQL query against production that deletes customer email notification preferences. Backups exist. What is your immediate action?",
    options: [
      { key: "A", text: "Immediately alert the engineering lead and database administrator, explain what happened with timestamps, and help restore from backup." },
      { key: "B", text: "Try to cover your tracks by deleting server access logs." },
      { key: "C", text: "Pretend a phantom hacker breached the system." },
      { key: "D", text: "Quietly close your laptop and take a 3-day sick leave." }
    ],
    correctAnswer: "A",
    explanation: "Honest, rapid incident escalation preserves audit trails and minimizes data recovery window before secondary systems sync."
  },
  {
    id: "work_005",
    category: "Workplace",
    question: "A key client requests a major scope expansion one week before final product signoff, promising they will pay more later. How should the account lead respond?",
    options: [
      { key: "A", text: "Acknowledge the value of the idea, explain the risk to the launch date, and issue a formal Change Request for Phase 2." },
      { key: "B", text: "Force the engineering team to work 24/7 without overtime to squeeze the request into Phase 1." },
      { key: "C", text: "Insult the client and cancel the contract." },
      { key: "D", text: "Quietly accept the scope creep without updating the legal contract." }
    ],
    correctAnswer: "A",
    explanation: "Formal change management protects project scope, budget, and engineering health while keeping client partnerships transparent."
  },
  {
    id: "work_006",
    category: "Workplace",
    question: "You observe signs of severe burnout in a high-performing teammate: skipped meals, cynical comments, and slipping attention to detail. How can you best support them?",
    options: [
      { key: "A", text: "Check in privately with care, offer to take over some blocking tickets, and encourage them to take accrued PTO." },
      { key: "B", text: "Report them to HR for having a negative attitude." },
      { key: "C", text: "Assign them twice as much work to keep their mind occupied." },
      { key: "D", text: "Ignore the signs until they quit." }
    ],
    correctAnswer: "A",
    explanation: "Compassionate peer support and tactical workload relief prevent irreversible clinical burnout and build lasting team loyalty."
  },
  {
    id: "work_007",
    category: "Workplace",
    question: "Your company is transitioning from fully in-office to a hybrid asynchronous workflow. What habit is most critical for individual success?",
    options: [
      { key: "A", text: "Documenting decisions, progress, and blockers clearly in written tickets rather than relying on informal hallway chats." },
      { key: "B", text: "Staying green on Slack 24 hours a day by moving your mouse." },
      { key: "C", text: "Calling 8 spontaneous video meetings every day." },
      { key: "D", text: "Refusing to write anything down." }
    ],
    correctAnswer: "A",
    explanation: "Asynchronous effectiveness depends on thorough written documentation that allows distributed colleagues to execute without synchronous bottlenecks."
  },
  {
    id: "work_008",
    category: "Workplace",
    question: "In a cross-team retrospective, another department blames your team for a missed milestone, but your records prove their input was 3 weeks late. How should you respond?",
    options: [
      { key: "A", text: "Present the objective timeline and shared handoff logs calmly, focusing on process improvement rather than personal fault." },
      { key: "B", text: "Shout accusations and insult the opposing manager." },
      { key: "C", text: "Stay silent and accept full blame for things your team did not do." },
      { key: "D", text: "Storm out of the meeting." }
    ],
    correctAnswer: "A",
    explanation: "Objective timestamps defuse emotional blame games and shift organizational focus toward fixing upstream pipeline handoffs."
  },
  {
    id: "work_009",
    category: "Workplace",
    question: "You receive a job offer with a 25% salary raise from a competitor, but you enjoy your current team. What is the professional way to approach your current manager?",
    options: [
      { key: "A", text: "Request a candid compensation review, share your market data and achievements, and discuss whether your role can be adjusted." },
      { key: "B", text: "Deliver an angry ultimatum on the public company forum." },
      { key: "C", text: "Accept the competitor's offer and stop showing up without giving notice." },
      { key: "D", text: "Begin sabotaging company projects out of resentment." }
    ],
    correctAnswer: "A",
    explanation: "Professional career conversations based on objective market value maintain positive relationships whether you stay or transition."
  },
  {
    id: "work_010",
    category: "Workplace",
    question: "A company implements a new tool that half the staff actively resists using. As team lead, what is the best change management approach?",
    options: [
      { key: "A", text: "Host interactive workshops, listen to specific friction points, demonstrate time-saving workflows, and identify peer champions." },
      { key: "B", text: "Threaten to fire anyone who doesn't use it on day one." },
      { key: "C", text: "Abandon the tool immediately and waste the budget." },
      { key: "D", text: "Pretend the tool doesn't exist." }
    ],
    correctAnswer: "A",
    explanation: "Empathic change management resolves the root causes of user resistance and builds grassroots adoption through demonstrable benefits."
  },
  {
    id: "work_011",
    category: "Workplace",
    question: "You are leading an interview panel and a senior colleague dismisses a highly qualified candidate because 'they wouldn't fit our Friday beer culture'. How do you respond?",
    options: [
      { key: "A", text: "Refocus the panel on the candidate's verified technical competencies, communication skills, and objective evaluation rubrics." },
      { key: "B", text: "Agree immediately because social drinks are the only thing that matters." },
      { key: "C", text: "Reject all candidates who apply." },
      { key: "D", text: "End the interview program permanently." }
    ],
    correctAnswer: "A",
    explanation: "Affinity bias and informal cultural stereotypes degrade hiring quality; structured competency rubrics ensure fair and talent-driven selection."
  },
  {
    id: "work_012",
    category: "Workplace",
    question: "During a high-stakes client demo, your staging environment fails to load due to a bad deploy. What is the most poised response?",
    options: [
      { key: "A", text: "Acknowledge the technical glitch calmly, switch seamlessly to a pre-recorded backup workflow or presentation deck, and investigate offline." },
      { key: "B", text: "Curse loudly and blame your junior engineer by name to the client." },
      { key: "C", text: "Close your laptop and run out of the room." },
      { key: "D", text: "Pretend the client's screen is broken." }
    ],
    correctAnswer: "A",
    explanation: "Professional composure during technical disruptions instills client confidence; having backup demonstrations ensures presentation momentum."
  },
  {
    id: "work_013",
    category: "Workplace",
    question: "A remote team member has not submitted updates in 4 days and missed 2 daily standups. What should the engineering manager do first?",
    options: [
      { key: "A", text: "Reach out via a gentle, caring 1-on-1 private message to check on their well-being and ask if any emergency or obstacle occurred." },
      { key: "B", text: "Immediately post a termination notice in the public company Slack." },
      { key: "C", text: "Lock their laptop remotely and call the police." },
      { key: "D", text: "Assume they moved to another country and do nothing." }
    ],
    correctAnswer: "A",
    explanation: "Empathetic welfare checks come first: personal emergencies, health issues, or local outages are frequent causes of sudden remote silence."
  },

  // --- CATEGORY 5: STUDENT LIFE & ACADEMIC (13 scenarios) ---
  {
    id: "stu_001",
    category: "Student Life",
    question: "You have a major semester exam and a part-time job shift scheduled at the exact same hour next Thursday. What is your best course of action?",
    options: [
      { key: "A", text: "Speak with your manager immediately to swap shifts with a coworker, and notify your professor well in advance if conflict remains." },
      { key: "B", text: "Skip both without notifying anyone and sleep in." },
      { key: "C", text: "Send a friend to impersonate you during the exam." },
      { key: "D", text: "Show up at the exam 45 minutes late without explaining." }
    ],
    correctAnswer: "A",
    explanation: "Early proactive communication gives managers and academic staff time to arrange legitimate accommodations without sudden crises."
  },
  {
    id: "stu_002",
    category: "Student Life",
    question: "In a 4-person university group project worth 40% of your grade, one student stops replying to messages and contributes nothing for three weeks. How should the team respond?",
    options: [
      { key: "A", text: "Document communication attempts and task allocations, notify the professor with evidence, and redistribute remaining tasks." },
      { key: "B", text: "Do nothing, fail the course, and complain after the final grades are posted." },
      { key: "C", text: "Put their name on the paper anyway and let them get a free grade." },
      { key: "D", text: "Physically confront the student outside their dormitory." }
    ],
    correctAnswer: "A",
    explanation: "Early factual documentation protects the group's academic standing and allows faculty to intervene fairly before submission deadlines."
  },
  {
    id: "stu_003",
    category: "Student Life",
    question: "You are studying for a difficult organic chemistry exam tomorrow morning. It is 1:00 AM, and you feel exhausted with two chapters left. What study science strategy is optimal?",
    options: [
      { key: "A", text: "Do a 20-minute active recall review of key concepts, get 6 hours of sleep for memory consolidation, and wake up fresh." },
      { key: "B", text: "Drink 4 energy drinks, pull an all-nighter, and walk into the exam with zero sleep." },
      { key: "C", text: "Give up and write your name only." },
      { key: "D", text: "Panic on social media until sunrise." }
    ],
    correctAnswer: "A",
    explanation: "Neuroscience proves that REM and deep sleep consolidate synaptic connections; sleep deprivation severely impairs cognitive retrieval."
  },
  {
    id: "stu_004",
    category: "Student Life",
    question: "A classmate offers to sell you a copy of last year's exam which they claim is identical to this year's test. What should you do?",
    options: [
      { key: "A", text: "Decline the offer, rely on legitimate syllabus materials and authorized past papers, and protect your academic integrity." },
      { key: "B", text: "Buy the paper and distribute copies to the entire class." },
      { key: "C", text: "Blackmail the classmate for money." },
      { key: "D", text: "Memorize only that paper and skip studying the rest of the syllabus." }
    ],
    correctAnswer: "A",
    explanation: "Academic dishonesty carries expulsion risks that permanently damage university transcripts and professional credentials."
  },
  {
    id: "stu_005",
    category: "Student Life",
    question: "You are writing an academic literature review and find a paragraph that perfectly summarizes your argument. What is the mandatory standard?",
    options: [
      { key: "A", text: "Paraphrase in your own voice, synthesize the idea with your thesis, and provide an accurate academic citation." },
      { key: "B", text: "Copy and paste the exact text with no quotation marks and claim it as your own original thought." },
      { key: "C", text: "Replace every third word with a synonym from a thesaurus to trick plagiarism detectors." },
      { key: "D", text: "Delete the entire section from your paper." }
    ],
    correctAnswer: "A",
    explanation: "Proper attribution honors original researchers and upholds scholarly rigor, which plagiarism detection tools strictly enforce."
  },
  {
    id: "stu_006",
    category: "Student Life",
    question: "You feel completely overwhelmed trying to balance 5 courses, a campus club presidency, and part-time work. What productivity strategy restores balance?",
    options: [
      { key: "A", text: "Use the Eisenhower Matrix to ruthlessly prioritize high-impact duties, delegate club tasks, and drop non-essential commitments." },
      { key: "B", text: "Try to multitask everything simultaneously during lectures." },
      { key: "C", text: "Drop out of college immediately without talking to an advisor." },
      { key: "D", text: "Ignore all assignments and play video games for 12 hours." }
    ],
    correctAnswer: "A",
    explanation: "The Eisenhower Matrix separates urgent from important tasks, empowering students to delegate or eliminate draining distractions."
  },
  {
    id: "stu_007",
    category: "Student Life",
    question: "During a thesis defense, a committee member asks a technical question you genuinely do not know the answer to. What is the most credible response?",
    options: [
      { key: "A", text: "Acknowledge the limitation honestly, state your reasoned hypothesis based on related findings, and commit to investigating it." },
      { key: "B", text: "Fabricate fake statistics on the spot to sound knowledgeable." },
      { key: "C", text: "Argue that the committee member's question is stupid and irrelevant." },
      { key: "D", text: "Faint to avoid answering." }
    ],
    correctAnswer: "A",
    explanation: "Intellectual honesty paired with structured reasoning demonstrates scientific maturity and earns respect from academic committees."
  },
  {
    id: "stu_008",
    category: "Student Life",
    question: "Your university roommate plays loud music late at night while you are trying to study and sleep. How do you address this productively?",
    options: [
      { key: "A", text: "Have a calm, respectful conversation during daylight hours to agree on reasonable quiet hours and mutual roommate guidelines." },
      { key: "B", text: "Smash their speakers while they are in the shower." },
      { key: "C", text: "Suffer in silence for the entire academic year." },
      { key: "D", text: "Call the police immediately without speaking to your roommate first." }
    ],
    correctAnswer: "A",
    explanation: "Direct, courteous daytime communication prevents resentment from boiling over and establishes healthy living boundaries."
  },
  {
    id: "stu_009",
    category: "Student Life",
    question: "You receive a C- on a midterm essay you poured weeks into. You believe the grading rubric was applied inconsistently. What is the constructive step?",
    options: [
      { key: "A", text: "Review the grading comments objectively, schedule an office hours appointment with the instructor, and politely ask for feedback on how to improve." },
      { key: "B", text: "Send an abusive, accusatory email to the instructor at 3:00 AM." },
      { key: "C", text: "Slash the tires of the professor's car." },
      { key: "D", text: "Drop out of school." }
    ],
    correctAnswer: "A",
    explanation: "Constructive office hour dialogues demonstrate genuine interest in learning and frequently lead to regrading adjustments or extra credit guidance."
  },
  {
    id: "stu_010",
    category: "Student Life",
    question: "A student feels paralyzed by procrastination on a 20-page research paper due in 10 days. What psychological technique overcomes the barrier?",
    options: [
      { key: "A", text: "The '5-Minute Rule': Commit to writing just 1 paragraph for 5 minutes; breaking task inertia builds momentum for longer sessions." },
      { key: "B", text: "Wait until 6 hours before the deadline to feel the panic rush." },
      { key: "C", text: "Hire an illegal essay mill to write the paper." },
      { key: "D", text: "Stare at the blank cursor for 8 hours without typing a word." }
    ],
    correctAnswer: "A",
    explanation: "Lowering the cognitive barrier to entry circumvents amygdala-driven task avoidance, allowing working memory to engage productively."
  },
  {
    id: "stu_011",
    category: "Student Life",
    question: "You are choosing between two university summer internships: one offers high prestige at an investment bank in a role you dislike, while the other offers hands-on coding experience in your dream field. How should you evaluate?",
    options: [
      { key: "A", text: "Align with long-term skill acquisition and intrinsic career motivation; genuine mastery yields greater compounding career capital." },
      { key: "B", text: "Pick whichever role has the coolest office snacks." },
      { key: "C", text: "Flip a coin and do neither." },
      { key: "D", text: "Choose solely based on what your friends think looks impressive on Instagram." }
    ],
    correctAnswer: "A",
    explanation: "Building rare, valuable skills in fields aligned with your genuine interests compounds over decades into sustainable career autonomy."
  },
  {
    id: "stu_012",
    category: "Student Life",
    question: "A campus peer struggles with severe anxiety and expresses feelings of helplessness before finals. How can you be a responsible friend?",
    options: [
      { key: "A", text: "Listen supportively without judgment, walk with them to the university student counseling center, and notify campus wellness staff if safety is a concern." },
      { key: "B", text: "Tell them to 'just snap out of it and toughen up'." },
      { key: "C", text: "Post their personal feelings on campus discussion boards." },
      { key: "D", text: "Ignore them and walk away." }
    ],
    correctAnswer: "A",
    explanation: "Compassionate presence paired with warm handoffs to professional mental health resources saves lives and destigmatizes psychological care."
  },
  {
    id: "stu_013",
    category: "Student Life",
    question: "You notice your laptop battery dies in 45 minutes during 3-hour lecture blocks. What is the most reliable academic preparation?",
    options: [
      { key: "A", text: "Carry a physical notebook and pen as dependable analog backup, sit near power outlets, and enable battery-saver profile." },
      { key: "B", text: "Stop taking notes completely." },
      { key: "C", text: "Interrupt the professor every 10 minutes to ask what they said." },
      { key: "D", text: "Demand the university replace your personal laptop for free." }
    ],
    correctAnswer: "A",
    explanation: "Analog redundancy prevents technology dependency from derailing academic comprehension during long technical lectures."
  },

  // --- CATEGORY 6: ETHICS & GOVERNANCE (13 scenarios) ---
  {
    id: "eth_001",
    category: "Ethics",
    question: "You discover an accounting error that erroneously added $25,000 to your non-profit organization's project budget from an unverified donor account. What is the ethical requirement?",
    options: [
      { key: "A", text: "Immediately report the anomaly to the finance director, preserve transaction logs, and initiate a full audit reconciliation." },
      { key: "B", text: "Quietly spend the funds on office perks before someone notices." },
      { key: "C", text: "Transfer the money into a secret offshore account." },
      { key: "D", text: "Delete the bookkeeping row to pretend it never happened." }
    ],
    correctAnswer: "A",
    explanation: "Financial transparency and immediate auditing safeguard the organization from legal sanctions and protect public trust."
  },
  {
    id: "eth_002",
    category: "Ethics",
    question: "An AI company trains a recruitment resume-ranking algorithm that penalizes candidates who attended women's colleges due to historical hiring data bias. What must the lead data scientist do?",
    options: [
      { key: "A", text: "Halt model deployment, audit the training set for systemic historical disparities, and implement fairness constraints." },
      { key: "B", text: "Deploy the algorithm anyway because 'algorithms are always neutral'." },
      { key: "C", text: "Delete all female applicant resumes from the company records." },
      { key: "D", text: "Blame the candidates for choosing those colleges." }
    ],
    correctAnswer: "A",
    explanation: "Algorithms trained on biased historical data automate and amplify past discrimination unless actively mitigated by fairness engineering."
  },
  {
    id: "eth_003",
    category: "Ethics",
    question: "A high-ranking executive asks you to sign off on an environmental compliance report containing manipulated water runoff test numbers. What should you do?",
    options: [
      { key: "A", text: "Refuse to falsify official records, document the request in writing, and report the violation through independent compliance channels." },
      { key: "B", text: "Sign the false report to keep your boss happy." },
      { key: "C", text: "Sign the report but cross your fingers behind your back." },
      { key: "D", text: "Accept a cash bribe to keep quiet." }
    ],
    correctAnswer: "A",
    explanation: "Falsifying environmental compliance exposes the public to ecological harm and carries severe personal criminal liability."
  },
  {
    id: "eth_004",
    category: "Ethics",
    question: "You find a lost USB drive in the company parking lot labeled 'Executive Salaries & Layoff Plan Q4'. What is the ethical action?",
    options: [
      { key: "A", text: "Hand the drive directly to Corporate Information Security without plugging it into any device." },
      { key: "B", text: "Plug it into your work laptop immediately to read the salaries." },
      { key: "C", text: "Upload the contents to public internet message boards." },
      { key: "D", text: "Sell the drive to a tabloid reporter." }
    ],
    correctAnswer: "A",
    explanation: "Plugging unknown USB drives into computers is a primary malware attack vector, and reading confidential payroll violates employee privacy."
  },
  {
    id: "eth_005",
    category: "Ethics",
    question: "A pharmaceutical lab employee notices that stability testing data for a new pediatric antibiotic was cherry-picked to pass FDA thresholds. What is their ethical duty?",
    options: [
      { key: "A", text: "Escalate the anomaly to the Quality Assurance officer and if suppressed, file a protected whistleblower disclosure." },
      { key: "B", text: "Ignore the data because children's health is not their personal concern." },
      { key: "C", text: "Destroy all raw testing notes to prevent lawsuits." },
      { key: "D", text: "Invest personal savings in the pharmaceutical company's stock." }
    ],
    correctAnswer: "A",
    explanation: "In healthcare, patient safety supersedes corporate profits; failing to report compromised drugs can cost human lives."
  },
  {
    id: "eth_006",
    category: "Ethics",
    question: "Your manager asks you to create artificial fake 5-star customer reviews on app stores to boost launch ratings. How do you respond?",
    options: [
      { key: "A", text: "Politely decline, pointing out that fake reviews violate consumer protection laws and app store policies that risk permanent bans." },
      { key: "B", text: "Write 500 fake reviews using automated bot scripts." },
      { key: "C", text: "Pay your friends cash to post misleading testimonials." },
      { key: "D", text: "Write negative 1-star reviews for all competing apps instead." }
    ],
    correctAnswer: "A",
    explanation: "Astroturfing violates FTC regulations and app marketplace terms of service, leading to public humiliation and account termination."
  },
  {
    id: "eth_007",
    category: "Ethics",
    question: "You realize your company's facial recognition software has a 35% false match rate on individuals with darker skin tones, yet the police department wants to deploy it next week. What must happen?",
    options: [
      { key: "A", text: "Demand the deployment be paused until demographic parity and false match benchmarks meet rigorous civil rights safety standards." },
      { key: "B", text: "Ship the software immediately to collect contract payment." },
      { key: "C", text: "Tell police to ignore errors because technology is never perfect." },
      { key: "D", text: "Remove the warning disclaimers from the user manual." }
    ],
    correctAnswer: "A",
    explanation: "Deploying racially disparate biometric tools in law enforcement leads directly to wrongful arrests and severe civil liberty violations."
  },
  {
    id: "eth_008",
    category: "Ethics",
    question: "While reviewing an acquisition proposal, you learn insider information that another company's stock will triple tomorrow. What does the law dictate?",
    options: [
      { key: "A", text: "You must not trade that stock or tip off others; trading on material non-public information is illegal insider trading." },
      { key: "B", text: "Immediately invest your entire life savings and tell your family." },
      { key: "C", text: "Post the tip on anonymous trading forums." },
      { key: "D", text: "Ask the acquisition target for a commission." }
    ],
    correctAnswer: "A",
    explanation: "Insider trading undermines market integrity and is aggressively prosecuted as a federal felony with mandatory prison time."
  },
  {
    id: "eth_009",
    category: "Ethics",
    question: "A customer asks you to delete their personal health data under GDPR/CCPA. Your database engineer complains it is 'technically inconvenient'. What must the company do?",
    options: [
      { key: "A", text: "Honor the legal Right to Erasure within statutory deadlines, verifying full purge across primary and replica datastores." },
      { key: "B", text: "Ignore the request and hope the user forgets." },
      { key: "C", text: "Charge the customer a $5,000 deletion fee." },
      { key: "D", text: "Sell their data immediately before deleting it." }
    ],
    correctAnswer: "A",
    explanation: "Data privacy regulations establish legally enforceable rights; non-compliance incurs fines of up to 4% of global corporate revenue."
  },
  {
    id: "eth_010",
    category: "Ethics",
    question: "An autonomous vehicle software engineer must program collision avoidance triage logic. Which ethical principle is accepted internationally?",
    options: [
      { key: "A", text: "Vehicles must never discriminate based on personal characteristics (age, gender, appearance) and must prioritize overall harm minimization." },
      { key: "B", text: "The vehicle should always protect the wealthiest passenger regardless of pedestrians." },
      { key: "C", text: "The car should aim for animals instead of inanimate objects." },
      { key: "D", text: "The vehicle should shut off its brakes in all crashes." }
    ],
    correctAnswer: "A",
    explanation: "International autonomous safety standards prohibit demographic bias in algorithmic collision response and emphasize universal harm reduction."
  },
  {
    id: "eth_011",
    category: "Ethics",
    question: "You notice an open-source contributor has been subtly injecting malicious obfuscated backdoors into minor documentation pull requests. What do you do?",
    options: [
      { key: "A", text: "Notify the project security maintainers privately with git diffs, freeze affected release artifacts, and revoke the committer's access." },
      { key: "B", text: "Merge the pull request to see what happens." },
      { key: "C", text: "Leave the project without telling anyone." },
      { key: "D", text: "Use the backdoor for personal profit." }
    ],
    correctAnswer: "A",
    explanation: "Supply chain attacks exploit trust in open-source maintainers; responsible security disclosures protect millions of downstream applications."
  },
  {
    id: "eth_012",
    category: "Ethics",
    question: "A company implements keystroke logging and webcam monitoring software on remote employee laptops without disclosing it in employment contracts. Is this permissible?",
    options: [
      { key: "A", text: "No; covert surveillance without transparent consent violates employee privacy rights and damages psychological safety." },
      { key: "B", text: "Yes; employers own the human beings they hire 24/7." },
      { key: "C", text: "Yes; privacy does not apply to remote workers." },
      { key: "D", text: "It is only legal if the employee works at night." }
    ],
    correctAnswer: "A",
    explanation: "Transparent employee monitoring policies require explicit notice and legitimate proportionality under employment law."
  },
  {
    id: "eth_013",
    category: "Ethics",
    question: "Your team creates an AI voice-cloning tool. A commercial partner wants to sell it to debt collection agencies to impersonate family members. What is your ethical mandate?",
    options: [
      { key: "A", text: "Decline the partnership, enforce acceptable-use policies prohibiting deceptive voice impersonation, and build watermarking authentication into the audio." },
      { key: "B", text: "Sell it for maximum profit and ask for a bonus." },
      { key: "C", text: "Help them write scripts that deceive elderly consumers." },
      { key: "D", text: "Pretend you did not hear how they intended to use the tool." }
    ],
    correctAnswer: "A",
    explanation: "Generative AI dual-use risks mandate strict contractual guardrails and synthetic media watermarking to prevent predatory manipulation."
  },

  // --- CATEGORY 7: BUSINESS & STRATEGY (13 scenarios) ---
  {
    id: "bus_001",
    category: "Business",
    question: "A fast-growing SaaS startup burns $150,000 per month with only 4 months of cash runway remaining. The sales cycle is 6 months. What is the urgent strategic move?",
    options: [
      { key: "A", text: "Immediately cut non-essential overhead, refocus sales on fast-closing high-margin accounts, and secure bridge financing." },
      { key: "B", text: "Double marketing spending on billboard advertisements in Times Square." },
      { key: "C", text: "Hire 20 more employees to look like a bigger company." },
      { key: "D", text: "Do nothing and assume revenue will magically multiply next week." }
    ],
    correctAnswer: "A",
    explanation: "Extending runway through disciplined cost containment and short-cycle conversions prevents insolvency before bridge capital closes."
  },
  {
    id: "bus_002",
    category: "Business",
    question: "A competitor launches a copycat product at half your retail price. How should an established market leader defend its market share?",
    options: [
      { key: "A", text: "Double down on brand trust, superior customer support, ecosystem integrations, and proprietary feature innovation rather than racing to the bottom." },
      { key: "B", text: "Immediately slash prices below manufacturing cost and bankrupt your own company." },
      { key: "C", text: "Sue the competitor with frivolous lawsuits without patent grounds." },
      { key: "D", text: "Give up and surrender all customers." }
    ],
    correctAnswer: "A",
    explanation: "Commoditization price wars destroy margins; sustainable defense comes from differentiation, switching costs, and customer loyalty."
  },
  {
    id: "bus_003",
    category: "Business",
    question: "Your e-commerce company notices an 80% cart abandonment rate on mobile checkout compared to 30% on desktop. What is the best product strategy?",
    options: [
      { key: "A", text: "Implement 1-click mobile wallets (Apple Pay/Google Pay), remove mandatory registration, and streamline checkout to 2 steps." },
      { key: "B", text: "Make the mobile checkout form 5 pages longer to collect more marketing survey data." },
      { key: "C", text: "Disable mobile purchasing entirely." },
      { key: "D", text: "Send angry emails to customers who abandoned carts." }
    ],
    correctAnswer: "A",
    explanation: "Friction in mobile typing causes high drop-offs; native digital wallets and guest checkouts dramatically boost mobile conversion."
  },
  {
    id: "bus_004",
    category: "Business",
    question: "What does a Net Promoter Score (NPS) of -25 indicate about a product's health?",
    options: [
      { key: "A", text: "The product has substantially more active detractors than promoters, signaling high churn risk and urgent need for product improvement." },
      { key: "B", text: "The product is the most popular in the world." },
      { key: "C", text: "Customers are ecstatic and recommending it everywhere." },
      { key: "D", text: "NPS numbers do not correlate with business success." }
    ],
    correctAnswer: "A",
    explanation: "Negative NPS scores indicate widespread dissatisfaction, toxic word-of-mouth, and an unsustainable Customer Acquisition Cost (CAC) model."
  },
  {
    id: "bus_005",
    category: "Business",
    question: "Why do venture capitalists emphasize Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) ratio being at least 3:1?",
    options: [
      { key: "A", text: "It proves the business generates sufficient gross margin from each acquired customer to cover operating expenses and scale profitably." },
      { key: "B", text: "It is a legal requirement set by the government." },
      { key: "C", text: "It means the company has no competitors." },
      { key: "D", text: "It ensures all employees get bonuses." }
    ],
    correctAnswer: "A",
    explanation: "An LTV:CAC of 3:1 provides the unit economic buffer needed for sales salaries, server costs, and enterprise capital reinvestment."
  },
  {
    id: "bus_006",
    category: "Business",
    question: "A restaurant chain wants to expand into a new international market. Which strategic approach minimizes cultural and regulatory risk?",
    options: [
      { key: "A", text: "Partner with reputable local franchisees who understand domestic culinary tastes, supply chains, and zoning laws." },
      { key: "B", text: "Open 100 stores overnight without conducting any local market research." },
      { key: "C", text: "Refuse to translate menus into the local language." },
      { key: "D", text: "Import all ingredients via expensive daily air freight." }
    ],
    correctAnswer: "A",
    explanation: "Local franchise partnerships transfer operational learning and cultural adaptation to experienced operators while scaling brand reach."
  },
  {
    id: "bus_007",
    category: "Business",
    question: "When should a tech company intentionally refactor technical debt rather than shipping new consumer-facing features?",
    options: [
      { key: "A", text: "When bug velocity outpaces feature delivery, deployment fragility halts releases, and engineer turnover spikes due to maintenance pain." },
      { key: "B", text: "Never; code quality does not affect business outcomes." },
      { key: "C", text: "Only when the company runs out of new ideas." },
      { key: "D", text: "Every Friday afternoon without testing." }
    ],
    correctAnswer: "A",
    explanation: "Unmanaged technical debt compounds like toxic financial interest, eventually grinding team productivity and uptime to a dead stop."
  },
  {
    id: "bus_008",
    category: "Business",
    question: "What is the strategic purpose of building a 'Network Effect' into a digital marketplace platform?",
    options: [
      { key: "A", text: "Every new user increases the value of the platform for all existing users, creating a powerful defensive competitive moat." },
      { key: "B", text: "It allows the company to stop spending money on web servers." },
      { key: "C", text: "It guarantees zero customer support tickets." },
      { key: "D", text: "It makes the website load instantly on any device." }
    ],
    correctAnswer: "A",
    explanation: "Direct and two-sided network effects (e.g., Airbnb, Uber, eBay) make platforms exponentially stickier and harder for copycats to disrupt."
  },
  {
    id: "bus_009",
    category: "Business",
    question: "A direct-to-consumer brand notices customer retention drops by 50% after the first order. Where should product leadership focus first?",
    options: [
      { key: "A", text: "Post-purchase onboarding, unboxing experience, customer support responsiveness, and automated loyalty re-engagement loops." },
      { key: "B", text: "Triple spending on celebrity endorsement commercials." },
      { key: "C", text: "Block users from unsubscribing from emails." },
      { key: "D", text: "Double the prices of all products." }
    ],
    correctAnswer: "A",
    explanation: "Retention drives e-commerce profitability; acquiring new customers into a leaky bucket destroys marketing margins."
  },
  {
    id: "bus_010",
    category: "Business",
    question: "What does a business achieve by pursuing a 'Product-Led Growth' (PLG) strategy?",
    options: [
      { key: "A", text: "The software product itself drives customer acquisition, retention, and expansion through free tiers, viral loops, and self-serve onboarding." },
      { key: "B", text: "The company fires all product managers." },
      { key: "C", text: "Products are sold only door-to-door." },
      { key: "D", text: "The company stops fixing software bugs." }
    ],
    correctAnswer: "A",
    explanation: "PLG models (e.g. Slack, Zoom, Figma) dramatically lower customer acquisition costs by letting product value convert users organically."
  },
  {
    id: "bus_011",
    category: "Business",
    question: "Why do companies conduct 'A/B testing' instead of relying solely on executive intuition for checkout redesigns?",
    options: [
      { key: "A", text: "Empirical randomized split testing measures actual user conversion uplift with statistical confidence, removing HiPPO (Highest Paid Person's Opinion) bias." },
      { key: "B", text: "A/B testing is legally required by tax authorities." },
      { key: "C", text: "Because executives never know how to use computers." },
      { key: "D", text: "To confuse website visitors intentionally." }
    ],
    correctAnswer: "A",
    explanation: "Controlled experiments isolate causal variables, preventing costly redesigns that inadvertently harm conversion rates."
  },
  {
    id: "bus_012",
    category: "Business",
    question: "What is the economic purpose of maintaining an emergency cash buffer for an early-stage business?",
    options: [
      { key: "A", text: "To survive macroeconomic downturns, revenue delays, and unexpected operational expenses without resorting to punitive distressed financing." },
      { key: "B", text: "To hide money from auditors." },
      { key: "C", text: "To buy cryptocurrency every weekend." },
      { key: "D", text: "Cash reserves are harmful and should always be zero." }
    ],
    correctAnswer: "A",
    explanation: "Cash reserves provide resilience against external market shocks, preserving executive autonomy during liquidity crunches."
  },
  {
    id: "bus_013",
    category: "Business",
    question: "When evaluating a subscription SaaS churn rate of 8% per month, what is the critical mathematical insight?",
    options: [
      { key: "A", text: "An 8% monthly churn rate compounds to losing over 60% of existing customers each year, requiring massive acquisition volume just to stay flat." },
      { key: "B", text: "8% per month means the business will grow by 800%." },
      { key: "C", text: "Monthly churn has no impact on annual revenue." },
      { key: "D", text: "Churn only matters for restaurants." }
    ],
    correctAnswer: "A",
    explanation: "Compounding monthly churn creates an insurmountable ceiling on company scale; fixing retention must precede scaling ad budgets."
  },

  // --- CATEGORY 8: REAL-WORLD PROBLEM SOLVING (13 scenarios) ---
  {
    id: "rw_001",
    category: "Problem Solving",
    question: "You are home alone during an intense winter blizzard and the power grid shuts down. Outside temperatures are -15°C. What is the safest survival protocol?",
    options: [
      { key: "A", text: "Consolidate into a single interior room with closed doors, insulate windows with blankets, layer warm clothing, and avoid indoor gas grills." },
      { key: "B", text: "Bring an outdoor charcoal grill into your living room for warmth." },
      { key: "C", text: "Open all windows to equalize indoor and outdoor pressure." },
      { key: "D", text: "Drink alcohol continuously because it makes your skin feel warm." }
    ],
    correctAnswer: "A",
    explanation: "Charcoal grills emit lethal odorless carbon monoxide indoors; consolidating thermal mass in a small insulated room prevents hypothermia safely."
  },
  {
    id: "rw_002",
    category: "Problem Solving",
    question: "You notice smoke emerging from beneath your kitchen oven door, and opening it reveals grease flames spreading. How do you extinguish a kitchen grease fire?",
    options: [
      { key: "A", text: "Slide a metal lid or cookie sheet over the pan to starve it of oxygen, turn off heat, or smother with baking soda; NEVER use water." },
      { key: "B", text: "Throw a bowl of water directly onto the boiling grease." },
      { key: "C", text: "Blow on the fire as hard as you can." },
      { key: "D", text: "Pick up the flaming pan and run through the house toward the front door." }
    ],
    correctAnswer: "A",
    explanation: "Pouring water onto grease causes explosive steam bursts that atomize burning oil across the kitchen; oxygen deprivation extinguishes it safely."
  },
  {
    id: "rw_003",
    category: "Problem Solving",
    question: "You are driving on a wet highway and your car suddenly begins hydroplaning (wheels losing road traction). How should you react?",
    options: [
      { key: "A", text: "Ease your foot gently off the accelerator, keep the steering wheel straight or steer gently toward open road; avoid slamming brakes." },
      { key: "B", text: "Slam the brake pedal to the floor with full force immediately." },
      { key: "C", text: "Yank the steering wheel sharply to the left and right." },
      { key: "D", text: "Pull the mechanical handbrake at 70 mph." }
    ],
    correctAnswer: "A",
    explanation: "Slamming brakes or violent steering while tires float on a water cushion causes violent spins; easing off throttle allows tire treads to regain grip."
  },
  {
    id: "rw_004",
    category: "Problem Solving",
    question: "You are hiking in a dense forest and realize you have lost the trail. Sunlight will disappear in 90 minutes. What is the priority protocol (S.T.O.P.)?",
    options: [
      { key: "A", text: "Stop, Think, Observe, Plan: Stay put in a visible dry location, prepare shelter before darkness, signal for help, and conserve energy." },
      { key: "B", text: "Run in a random direction at full speed hoping to hit a road before sunset." },
      { key: "C", text: "Eat unknown wild mushrooms to stay energized." },
      { key: "D", text: "Wade into deep river rapids in the dark." }
    ],
    correctAnswer: "A",
    explanation: "Panic wandering accounts for most wilderness fatalities; staying put near your last known location makes search-and-rescue teams 10x more effective."
  },
  {
    id: "rw_005",
    category: "Problem Solving",
    question: "In an office cafeteria, a colleague suddenly clutches their throat, unable to speak, cough, or breathe. What emergency action should you initiate?",
    options: [
      { key: "A", text: "Perform the Heimlich Maneuver (abdominal thrusts upward just above the navel) or deliver firm back blows immediately." },
      { key: "B", text: "Offer them a large glass of water to drink." },
      { key: "C", text: "Slap their face until they start breathing." },
      { key: "D", text: "Walk away because it might be embarrassing." }
    ],
    correctAnswer: "A",
    explanation: "The universal choking sign indicates total airway obstruction; abdominal thrusts utilize diaphragmatic air pressure to dislodge foreign bodies."
  },
  {
    id: "rw_006",
    category: "Problem Solving",
    question: "Your laptop battery catches fire and starts hissing with toxic white smoke on your desk. What is the proper containment?",
    options: [
      { key: "A", text: "Evacuate bystanders, use a Class D or copious water/ABC extinguisher from a safe distance, ventilate fumes, and call emergency services." },
      { key: "B", text: "Hug the laptop to smother the fire with your clothes." },
      { key: "C", text: "Throw the burning laptop into an enclosed plastic trash can." },
      { key: "D", text: "Blow on the battery cells." }
    ],
    correctAnswer: "A",
    explanation: "Lithium-ion thermal runaway produces hazardous hydrogen fluoride gas and intense heat requiring rapid ventilation and dedicated extinguishing."
  },
  {
    id: "rw_007",
    category: "Problem Solving",
    question: "You suspect someone in your home has been exposed to carbon monoxide poisoning (headache, dizziness, nausea). What is the immediate first step?",
    options: [
      { key: "A", text: "Evacuate everyone into fresh outdoor air immediately and dial emergency services (911) from outside." },
      { key: "B", text: "Tell them to lie down and take a nap in the same room." },
      { key: "C", text: "Turn on the gas stove to check if the burners work." },
      { key: "D", text: "Wait 24 hours to see if symptoms improve." }
    ],
    correctAnswer: "A",
    explanation: "Carbon monoxide binds to hemoglobin with 200x greater affinity than oxygen; immediate fresh-air evacuation prevents loss of consciousness and death."
  },
  {
    id: "rw_008",
    category: "Problem Solving",
    question: "You receive an urgent phone call from an alleged bank fraud agent demanding you read a 6-digit SMS verification code to 'stop an unauthorized wire'. What should you do?",
    options: [
      { key: "A", text: "Hang up immediately, independently find the bank's official number from the back of your card, and call them directly." },
      { key: "B", text: "Read the SMS code to the caller right away." },
      { key: "C", text: "Give them your online banking password to verify your identity." },
      { key: "D", text: "Wire $500 to the caller's personal account to test the system." }
    ],
    correctAnswer: "A",
    explanation: "Legitimate banks never ask customers for one-time passwords (OTPs); fraudsters use urgency and caller ID spoofing to bypass 2-factor authentication."
  },
  {
    id: "rw_009",
    category: "Problem Solving",
    question: "You are traveling in a foreign city and notice your wallet and passport are missing from your zipped backpack. What is the step-by-step recovery order?",
    options: [
      { key: "A", text: "Freeze credit cards via mobile banking, file an official police report, and contact your national embassy for an emergency passport." },
      { key: "B", text: "Panic and sleep on the train platform for a week." },
      { key: "C", text: "Borrow money from strangers in the street." },
      { key: "D", text: "Do nothing and hope the thief mails it back." }
    ],
    correctAnswer: "A",
    explanation: "Freezing cards prevents identity and financial drain; an official police report is required by embassies to issue replacement travel documents."
  },
  {
    id: "rw_010",
    category: "Problem Solving",
    question: "You smell a strong odor of natural gas (sulfur / rotten eggs) upon entering your apartment. What is the crucial safety rule?",
    options: [
      { key: "A", text: "Do not flip any light switches, do not light matches, evacuate outside immediately, and call the gas utility emergency line from outdoors." },
      { key: "B", text: "Turn on all light switches to see where the leak is." },
      { key: "C", text: "Light a candle to burn away the odor." },
      { key: "D", text: "Go to sleep and wait until morning." }
    ],
    correctAnswer: "A",
    explanation: "Flipping an electrical switch creates microscopic electrical arcs that can instantly ignite explosive fuel-air gas mixtures."
  },
  {
    id: "rw_011",
    category: "Problem Solving",
    question: "You are swimming in the ocean and suddenly get pulled rapidly away from shore by a rip current. What is the survival technique?",
    options: [
      { key: "A", text: "Do not swim against the current; swim parallel to the shoreline until out of the narrow rip current, then swim at an angle back to shore." },
      { key: "B", text: "Swim straight toward shore with maximum physical exhaustion." },
      { key: "C", text: "Dive straight down to the ocean floor and stay there." },
      { key: "D", text: "Take off your swim clothes and throw them away." }
    ],
    correctAnswer: "A",
    explanation: "Rip currents are narrow ribbons of fast water; swimming parallel escapes the current channel before exhaustion causes drowning."
  },
  {
    id: "rw_012",
    category: "Problem Solving",
    question: "You arrive at a minor traffic collision on a country road. One passenger is conscious but reports severe neck and spinal pain. What must you NOT do?",
    options: [
      { key: "A", text: "Do not move or twist their neck or spine unless immediate fire or explosion threatens life; stabilize their head until paramedics arrive." },
      { key: "B", text: "Call emergency services immediately." },
      { key: "C", text: "Keep the passenger warm and calm." },
      { key: "D", text: "Turn on vehicle hazard lights to warn oncoming traffic." }
    ],
    correctAnswer: "A",
    explanation: "Moving a patient with potential cervical spine fractures without spinal immobilization can cause permanent spinal cord transection and paralysis."
  },
  {
    id: "rw_013",
    category: "Problem Solving",
    question: "A thunderstorm approaches while you are standing in an open golf fairway or soccer field. What is the safest immediate action?",
    options: [
      { key: "A", text: "Seek enclosed hard-topped vehicle or substantial building shelter; avoid standing under isolated tall trees or holding metal rods." },
      { key: "B", text: "Stand directly underneath the tallest single oak tree on the field." },
      { key: "C", text: "Hold a metal umbrella as high into the air as possible." },
      { key: "D", text: "Lie completely flat in a puddle of water." }
    ],
    correctAnswer: "A",
    explanation: "Isolated tall trees attract ground strikes and channel dangerous ground currents; enclosed structures and vehicles act as safe Faraday cages."
  }
];
