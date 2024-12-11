export const PARTNER_ICONS = [
    {
        path: "/icons/versace.svg",
        alt: "versace logo",
    },
    {
        path: "/icons/zara.svg",
        alt: "zara logo",
    },
    {
        path: "/icons/gucci.svg",
        alt: "gucci logo",
    },

    {
        path: "/icons/parada.svg",
        alt: "parada logo",
    },
    {
        path: "/icons/calvin-klein.svg",
        alt: "calvin-klein logo",
    }
]

export const STYLES = [
    {
        title: "casual",
        imgUrl: "/images/style-casual.png"
    },
    {
        title: "formal",
        imgUrl: "/images/style-formal.png"
    },
    {
        title: "party",
        imgUrl: "/images/style-party.png"
    },
    {
        title: "gym",
        imgUrl: "/images/style-gym.png"
    },
]

export const TESTIMONIALS = [
    {
        name: "Sara M.",
        content: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        name: "Alex K.",
        content: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
        name: "James L.",
        content: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    },
    {
        name: "Thomas J.",
        content: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    },
    {
        name: "Jassica T.",
        content: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    },
]

export const FOOTER_SUB_NAVS = [
    {
        title: "company",
        navItems: ["About", "Features", "Works", "Career"]
    },
    {
        title: "help",
        navItems: ["Customer Support", "Delivery details", "Term & Conditions", "Privacy Policy"],
    },
    {
        title: "faq",
        navItems: ["Account", "Manage Deliveries", "Orders", "Payment"]
    },
    {
        title: "resources",
        navItems: ["Free eBook", "Development Tutorial", "How to - Blog", "Youtube Playlist"]
    }
]

export const CATEGORIES = ["casual", "formal", "party", "gym"] as const

export const TYPES = ["t-shirts", "shorts", "shirts", "hoodie", "jeans", "pants"] as const

export const SIZES = ["xxx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "3x-large", "4x-large"] as const;

export const SECTIONS: Array<{ title: string; value: "details" | "reviews" | "faqs" }> = [
    {
        title: "Product Details",
        value: "details"
    },
    {
        title: "Rating & Reviews",
        value: "reviews"
    },
    {
        title: "FAQs",
        value: "faqs"
    }
]

export const FAQS = [
    {
        "question": "What is your return and exchange policy?",
        "answer": "We accept returns and exchanges within 30 days of purchase. Items must be in their original condition with tags attached. Please visit our Returns & Exchanges page for more details."
    },
    {
        "question": "How can I track my order?",
        "answer": "Once your order is shipped, you'll receive an email with a tracking number and a link to track your package. You can also log into your account to check the status of your order."
    },
    {
        "question": "What payment methods do you accept?",
        "answer": "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. We also support payment in installments via Klarna or Afterpay in select regions."
    },
    {
        "question": "Do you offer international shipping?",
        "answer": "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location. Please check our Shipping Policy page for more details."
    },
    {
        "question": "How do I know what size to order?",
        "answer": "We provide a detailed size guide on each products page to help you find the right fit. If you're still unsure, feel free to contact our customer support team for assistance."
    },
    {
        "question": "Can I cancel or modify my order after placing it?",
        "answer": "We allow cancellations or modifications within 1 hour of placing the order. After this period, orders are processed and cannot be changed. Please contact customer support for urgent assistance."
    },
    {
        "question": "Do you offer gift cards?",
        "answer": "Yes, we offer digital gift cards in various denominations. Gift cards can be purchased online and will be sent via email to the recipient."
    },
    {
        "question": "What should I do if I receive a damaged or incorrect item?",
        "answer": "If you receive a damaged or incorrect item, please contact our customer support team immediately with your order number and a photo of the issue. We will resolve it as quickly as possible."
    }
]

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
