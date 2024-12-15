export const CATEGORIES = ["casual", "formal", "party", "gym"] as const

export const TYPES = ["t-shirts", "shorts", "shirts", "hoodie", "jeans", "pants"] as const

export const SIZES = ["xxx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "3x-large", "4x-large"] as const;

export const ZONES = [
    "Ayeyarwady",
    "Bago",
    "Chin",
    "Kachin",
    "Kayah",
    "Kayin",
    "Magway",
    "Mandalay",
    "Mon",
    "Naypyidaw",
    "Rakhine",
    "Sagaing",
    "Shan",
    "Tanintharyi",
    "Yangon"
]

export const TOWNSHIPS: Record<string, string[]> = {
    "Ayeyarwady": ["Pathein", "Hinthada", "Bogale", "Myaungmya", "Maubin", "Labutta", "Pyapon"],
    "Bago": ["Bago", "Taungoo", "Pyay", "Thayarwady"],
    "Chin": ["Hakha", "Falam", "Tedim", "Mindat", "Kanpetlet", "Tonzang", "Paletwa"],
    "Kachin": ["Myitkyina", "Bhamo", "Mohnyin", "Putao", "Shwegu", "Waingmaw"],
    "Kayah": ["Loikaw", "Demawso", "Hpruso", "Bawlakhe", "Mese"],
    "Kayin": ["Hpa-An", "Myawaddy", "Hpapun", "Kawkareik"],
    "Magway": ["Magway", "Minbu", "Pakokku", "Thayet"],
    "Mandalay": ["Amarapura", "Chanayethazan", "Chanmyathazi", "Mahaaungmyay", "Pyigyidagun", "Aungmyethazan", "Mandalay", "Kyaukse", "Myingyan", "Meiktila", "Yamethin"],
    "Mon": ["Mawlamyine", "Thaton", "Kyaikto", "Paung", "Chaungzon", "Mudon", "Thanbyuzayat"],
    "Naypyidaw": ["Zeyarthiri", "Pobbathiri", "Ottarathiri", "Dekkhina Thiri", "Pyinmana", "Tatkone", "Lewe", "Zabuthiri"],
    "Rakhine": ["Sittwe", "Kyaukphyu", "Maungdaw", "Thandwe", "Mrauk-U", "Buthidaung"],
    "Sagaing": ["Sagaing", "Monywa", "Shwebo", "Katha", "Kale", "Tamu"],
    "Shan": ["Taunggyi", "Lashio", "Kengtung", "Muse", "Hsipaw", "Nyaungshwe"],
    "Tanintharyi": ["Dawei", "Myeik", "Kawthaung"],
    "Yangon": ["Ahlone", "Bahan", "Botataung", "Dagon", "Dagon Myothit (East)", "Dagon Myothit (North)", "Dagon Myothit (South)", "Dala", "Hlaing", "Hlaingthaya", "Insein", "Kamayut", "Kyauktada", "Kyimyindaing", "Lanmadaw", "Latha", "Mayangone", "Mingaladon", "Mingalartaungnyunt", "North Okkalapa", "Pabedan", "Sanchaung", "Seikkan", "South Okkalapa", "Tamwe", "Thaketa", "Thingangyun", "Yankin"]
};


export const ORDER_STATUS = ["pending", "delivered", "canceled"] as const;