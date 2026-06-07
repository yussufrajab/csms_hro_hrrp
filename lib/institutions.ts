export interface Institution {
  id: number;
  name: string;
  vote?: string;
}

export const INSTITUTIONS: Institution[] = [
  { id: 1, name: "AFISI YA MKURUGENZI WA MASHTAKA", vote: "029" },
  { id: 2, name: "AFISI YA MWANASHERIA MKUU", vote: "028" },
  { id: 3, name: "AFISI YA RAISI KAZI, UCHUMI NA UWEKEZAJI", vote: "006" },
  { id: 4, name: "Baraza la Jiji", vote: "201" },
  { id: 5, name: "Baraza la Manispaa Magharibi A", vote: "203" },
  { id: 6, name: "Baraza la Manispaa Magharibi B", vote: "204" },
  { id: 7, name: "Baraza la Manispaa Mjini Unguja", vote: "202" },
  { id: 8, name: "Baraza la Mitihani", vote: "547" },
  { id: 9, name: "Baraza la Mji Chake Chake", vote: "210" },
  { id: 10, name: "Baraza la Mji Kaskazini A Unguja", vote: "207" },
  { id: 11, name: "Baraza la Mji Kaskazini B Unguja", vote: "208" },
  { id: 12, name: "Baraza la Mji Kati Unguja", vote: "205" },
  { id: 13, name: "Baraza la Mji Mkoani", vote: "209" },
  { id: 14, name: "Baraza la Mji Wete", vote: "211" },
  { id: 15, name: "Bodi ya Huduma za Maktaba", vote: "543" },
  { id: 16, name: "Chuo cha Kiislamu" },
  { id: 17, name: "Halmashauri ya Wilaya ya Kusini Unguja", vote: "206" },
  { id: 18, name: "Halmashauri ya Wilaya ya Micheweni", vote: "212" },
  { id: 19, name: "Hospitali ya Mnazi Mmoja", vote: "025" },
  { id: 20, name: "KAMISHENI YA ARDHI ZANZIBAR", vote: "520" },
  { id: 21, name: "Kamisheni ya Kazi", vote: "573" },
  { id: 22, name: "KAMISHENI YA KUKABILIANA NA MAAFA ZANZIBAR", vote: "510" },
  { id: 23, name: "KAMISHENI YA UTALII ZANZIBAR" },
  { id: 24, name: "KAMISHENI YA UTUMISHI WA UMMA", vote: "036" },
  { id: 25, name: "Magereza" },
  { id: 26, name: "MAMLAKA YA KUDHIBITI NA KUPAMBANA NA DAWA ZA KULEVYA ZANZIBAR", vote: "032" },
  { id: 27, name: "MAMLAKA YA KUZUIA RUSHWA NA UHUJUMU WA UCHUMI ZANZIBAR", vote: "035" },
  { id: 28, name: "Mamlaka ya Serikali Mtandao (eGAZ)", vote: "038" },
  { id: 29, name: "Mamlaka ya Uwezeshaji Wananchi Kiuchumi (ZEA)", vote: "105" },
  { id: 30, name: "Ofisi ya Hatimiliki (COSOZA)", vote: "558" },
  { id: 31, name: "OFISI YA MAKAMO WA KWANZA WA RAISI", vote: "002" },
  { id: 32, name: "OFISI YA MAKAMO WA PILI WA RAISI", vote: "003" },
  { id: 33, name: "Ofisi ya Mhasibu Mkuu wa Serikali", vote: "022" },
  { id: 34, name: "OFISI YA MKAGUZI MKUU WA NDANI WA SERIKALI", vote: "052" },
  { id: 35, name: "Ofisi ya Mkaguzi wa Elimu", vote: "546" },
  { id: 36, name: "Ofisi ya Mkuu wa Mkoa wa Kaskazini Pemba", vote: "051" },
  { id: 37, name: "Ofisi ya Mkuu wa Mkoa wa Kaskazini Unguja", vote: "048" },
  { id: 38, name: "Ofisi ya Mkuu wa Mkoa wa Kusini Pemba", vote: "050" },
  { id: 39, name: "Ofisi ya Mkuu wa Mkoa wa Kusini Unguja", vote: "049" },
  { id: 40, name: "Ofisi ya Mkuu wa Mkoa wa Mjini Magharibi Unguja", vote: "047" },
  { id: 41, name: "Ofisi ya Msajili wa Hazina", vote: "106" },
  { id: 42, name: "OFISI YA MUFTI MKUU WA ZANZIBAR", vote: "053" },
  { id: 43, name: "OFISI YA RAIS, FEDHA NA MIPANGO", vote: "567" },
  { id: 44, name: "OFISI YA RAIS - IKULU", vote: "567" },
  { id: 45, name: "OFISI YA RAIS - KATIBA SHERIA UTUMISHI NA UTAWALA BORA", vote: "005" },
  { id: 46, name: "OFISI YA RAIS, TAWALA ZA MIKOA, SERIKALI ZA MITAA NA IDARA MAALUMU ZA SMZ", vote: "004" },
  { id: 47, name: "Skuli ya JKU" },
  { id: 48, name: "Skuli ya Sheria Zanzibar", vote: "570" },
  { id: 49, name: "TAASISI YA ELIMU ZANZIBAR", vote: "542" },
  { id: 50, name: "TAASISI YA NYARAKA NA KUMBUKUMBU", vote: "057" },
  { id: 51, name: "Taasisi ya Utafiti wa Uvuvi (ZAFIRI)", vote: "526" },
  { id: 52, name: "Tume ya kusimamia Nidhamu" },
  { id: 53, name: "TUME YA MAADILI YA VIONGOZI WA UMMA", vote: "113" },
  { id: 54, name: "Tume ya Mipango", vote: "024" },
  { id: 55, name: "TUME YA UCHAGUZI YA ZANZIBAR", vote: "031" },
  { id: 56, name: "Tume ya Ushindani Halali wa Biashara", vote: "518" },
  { id: 57, name: "TUME YA UTUMISHI SERIKALINI", vote: "037" },
  { id: 58, name: "Wakala wa Barabara", vote: "559" },
  { id: 59, name: "WAKALA WA MAJENGO ZANZIBAR", vote: "522" },
  { id: 60, name: "Wakala wa Matrekta", vote: "527" },
  { id: 61, name: "Wakala wa Vipimo Zanzibar", vote: "519" },
  { id: 62, name: "WIZARA YA AFYA", vote: "008" },
  { id: 63, name: "WIZARA YA ARDHI NA MAENDELEO YA MAKAAZI ZANZIBAR", vote: "014" },
  { id: 64, name: "WIZARA YA BIASHARA NA MAENDELEO YA VIWANDA", vote: "017" },
  { id: 65, name: "WIZARA YA ELIMU NA MAFUNZO YA AMALI", vote: "011" },
  { id: 66, name: "WIZARA YA HABARI, VIJANA, UTAMADUNI NA MICHEZO", vote: "018" },
  { id: 67, name: "WIZARA YA KILIMO UMWAGILIAJI MALIASILI NA MIFUGO", vote: "012" },
  { id: 68, name: "WIZARA YA MAENDELEO YA JAMII,JINSIA,WAZEE NA WATOTO", vote: "019" },
  { id: 69, name: "WIZARA YA MAJI NISHATI NA MADINI", vote: "015" },
  { id: 70, name: "WIZARA YA UCHUMI WA BULUU NA UVUVI", vote: "013" },
  { id: 71, name: "WIZARA YA UJENZI MAWASILIANO NA UCHUKUZI", vote: "016" },
  { id: 72, name: "WIZARA YA UTALII NA MAMBO YA KALE", vote: "010" },
];

export const INSTITUTION_NAMES: string[] = INSTITUTIONS.map((i) => i.name);

export function searchInstitutions(query: string): Institution[] {
  if (!query.trim()) return INSTITUTIONS;

  const q = query.toLowerCase();

  const exact: Institution[] = [];
  const startsWith: Institution[] = [];
  const includes: Institution[] = [];

  for (const inst of INSTITUTIONS) {
    const nameLower = inst.name.toLowerCase();
    const voteLower = inst.vote?.toLowerCase() ?? "";

    if (nameLower === q || voteLower === q) {
      exact.push(inst);
    } else if (nameLower.startsWith(q) || voteLower.startsWith(q)) {
      startsWith.push(inst);
    } else if (nameLower.includes(q) || voteLower.includes(q)) {
      includes.push(inst);
    }
  }

  return [...exact, ...startsWith, ...includes];
}