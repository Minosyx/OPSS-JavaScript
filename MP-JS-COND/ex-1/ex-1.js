let select = document.querySelector('select');

// Ta metoda monitoruje zachowanie obiektu 'select' i wywołuje funkcję wrozbita, jesli zaszła zmiana na obiekcie
// To na co jeszcze może zareagować metoda addEventlistener znajdziecie tutaj:
// https://developer.mozilla.org/en-US/docs/Web/Events
select.addEventListener('change', wrozbita);

let p = document.createElement('p');
let q = document.createElement('q');

function wrozbita(){
  let color = "";
  let info = "";
  let sign = select.value;
  q.setAttribute("cite", "https://edutorial.pl/ciekawostki/znaki-zodiaku-co-warto-o-nich-wiedziec/");
  switch (sign){
    case "aries":
    color = "rgb(255, 0, 0, 0.6)";
    info = "Osoby ze znaku Barana są uważane za przywódców o silnej woli. Nie bawią się w niuanse - są szczere i tego samego oczekują od innych. Ponad to, są przedsiębiorczy, samodzielni, energiczni i co za tym idzie- gwałtowni. Cechuje ich również impulsywność i niecierpliwość.";
    break;

    case "taurus":
    color = "rgb(217, 126, 214, 0.6)";
    info = "To, co nasuwa się na myśl widząc znak byka to upór. Jest to trafne skojarzenie, jako że osoby spod tego znaku są konsekwentne w swoich upodobaniach i rzeczowe. Ich usposobienie jest łagodne, wytrwałe, a jednocześnie zaborcze. Myślą w sposób rzeczowy, starają się czerpać z życia jak najwięcej.";
    break;

    case "gemini":
    color = "rgb(242, 255, 0, 0.6)";
    info = "Bliźnięta znane są jako zmienne i elastyczne. Ich spryt i błyskotliwość pomagają w intelektualnych konwersacjach. Są obiektywne, przez co uważane są czasem za chłodne i zdystansowane. Należą do grona osób ciekawskich.";
    break;

    case "cancer":
    color = "rgb(44, 96, 133, 0.6)";
    info = "Cechami wyróżniającymi osoby spod znaku Raka są nieśmiałość i wrażliwość. Panicznie boją się opuszczenia. Ich największymi zaletami są wielka wyobraźnia i przywiązanie do najbliższych. Przeważnie unikają bezpośredniej konfrontacji.";
    break;

    case "leo":
    color = "rgb(255, 157, 0, 0.6)";
    info = "Lwy są znane z tego, że uwielbiają być w centrum uwagi i obdarzone są radością życia. Uwielbiają dramatyzować i wyrażać swoją opinię. Są ambitne i odważne-niczego się nie boją. Zdarza im się być egoistycznymi.";
    break;

    case "virgo":
    color = "rgb(0, 145, 0, 0.6)";
    info = "Zawsze uporządkowane i dokładne, Panny nigdy nie mają bałaganu w domu, jak i w życiu. Czasem uznawane za wybredne, dbają o zdrowie, ciało oraz otoczenie. Nie przepadają za okazywaniem emocji.";
    break;

    case "libra":
    color = "rgb(140, 191, 140, 0.6)";
    info = "Osoby spod znaku Wagi zawsze są sprawiedliwe i bezstronne. Cenią sobie równowagę i harmonię- unikają konfliktów. Przez to otoczeniu może zdawać się, że są dwulicowe. Ponad to są łagodne, uprzejme i eleganckie.";
    break;

    case "scorpio":
    color = "rgb(92, 16, 16, 0.6)";
    info = "Zaangażowane we wszystko co robią, są niepozornym wulkanem energii. Z reguły wiedzą czego chcą i nie boją się po to sięgnąć. Są bardzo silne psychicznie, nie pozwalają się ponieść negatywnym emocjom.";
    break;

    case "sagittarius":
    color = "rgb(150, 16, 173, 0.6)";
    info = "Strzelce kochają wolność i jak ognia unikają rutyny. Są przedsiębiorczy, energiczni i uwielbiają przygody. Są ciekawi świata, ambitni, niezależni. Lubią otaczać się ludźmi o podobnych przekonaniach, lecz nie pozwalają narzucić sobie zdania.";
    break;

    case "capricorn":
    color = "rgb(102, 60, 8, 0.6)";
    info = "Zdeterminowane i efektywne, dążą wytrwale do ustalonego celu. Lubią zaznaczać swoją pozycję i występować w obronie norm. Raczej poważni i spokojni, lubiący praktyczne rozwiązania. Są również ostrożni, zdyscyplinowani- lubią brać na siebie zbyt dużą odpowiedzialność.";
    break;

    case "aquarius":
    color = "rgb(10, 209, 183, 0.6)";
    info = "Wodniki są przyjacielskie i lubiane, choć zazwyczaj zachowują dystans. Z reguły nieśmiali i cierpliwi, lecz zdarza im się być też żywymi i ekstrawertycznymi. Logicznie myślący, mają silną wolę.";
    break;

    case "pisces":
    color = "rgb(115, 201, 152, 0.6)";
    info = "Osoby spod znaku ryb są delikatne i łagodne. Zawsze tolerują inne osoby i aktywnie uczestniczą w życiu bliskich. Czasem są podatne na wpływy, przez co sprawiają wrażenie zbyt wrażliwych. Są idealnymi doradcami, gdyż nigdy nie zawodzi u nich intuicja i instynkt.";
    break;
  }
  document.body.style.backgroundColor = color;
  q.innerHTML = info;
  p.appendChild(q);
}
document.body.appendChild(p);
