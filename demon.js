const open = require("open");
const axios = require("axios");
const { format, add } = require("date-fns");
const notifier = require("node-notifier");
const player = require("play-sound")((opts = {}));

const cookie = 'ssid=c900443093mac-ZuXHLhX5Rmtl; didomi_token=eyJ1c2VyX2lkIjoiMTc5NWJjMWQtNzVkYi02MzA3LWEwMzEtMTNiMTkzYTk1YzFlIiwiY3JlYXRlZCI6IjIwMjEtMDUtMTFUMTQ6MDg6MjEuNTY3WiIsInVwZGF0ZWQiOiIyMDIxLTA1LTExVDE0OjA4OjIzLjg0MloiLCJ2ZW5kb3JzIjp7ImVuYWJsZWQiOlsiYzpnb29nbGVhbmEtS0ZLenBXamIiLCJjOmdvb2dsZWFkcy02TmE4NmpucSIsImM6Y2xvdWRmbGFyZS1tWVlGTVlOVCIsImM6ZG91YmxlY2xpYy1yNjIzOGdhOSIsImM6ZG9jdG9saWItaXdYQmhXY3AiXX0sInB1cnBvc2VzIjp7ImVuYWJsZWQiOlsibWVzdXJlZGEtREVUUXo2N0EiLCJtYXJrZXRpbmctSkxScWJ0RzgiLCJwdWJsaWNpdGUtQ2pXcVdhWjIiXX0sInZlcnNpb24iOjF9; euconsent=BPGCZ5XPGCZ5uAHABBFRDWAAAAAyOAAA; _gcl_au=1.1.1499033397.1620742126; esid=WJEm84zRZFP50qze8qfSibEk; __cf_bm=c29497ba2aa39c28c3df87d310566b01cf5c22e7-1621887060-1800-AWULPdgl1xITgzuCCaBUECzlirNdDbn3ghPjtPVmb35E1/lmg6XuUeW64gXjMpqskMLPV7PFmRP0H8ElKgwcvsk=; utm_b2b=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaUoxZEcxZmMyOTFjbU5sUFdScGNtVmpkQ1oxZEcxZmJXVmthWFZ0UFFZNkJrVlUiLCJleHAiOiIyMDIxLTA1LTI0VDIwOjQyOjQ3LjIwN1oiLCJwdXIiOiJjb29raWUudXRtX2IyYiJ9fQ%3D%3D--3c0c96b2c3210c0608034e56aa406e6a38390dcb; _doctolib_session=67gUCXYCKZgKlNkYlJ7WU5ygTWOryu4CBPb3rhiMy1jj6J2FF39jRzo8uHiZOPqF7J7DacLYWFpKpSt8OiJ%2BM%2Fw32%2BbTvTto65A0lYJsUnB0AP9rj%2BLXgy4jHd9xYQ0fWBWBTbvlWkEd1UR95Nc%2BkHiMgwBZRJ%2FyL7P3bUxTo7f1%2FG8EtX2KWfV61a8QQ4xnkqYQ5hvDN0ySpmnOpnD%2BJWw7LkbF8iJhve%2BxBCsX6%2BepMF%2FZXlDmt4lAsH5TSSvuncYVuBqI4kzl65k1xkShTaxI2GVPgetmyaAOVE9dMII%2FDCG7abAZmvV5gle9RXOa2ndjwu7z5UhCtYU4jbSRF8XBEu3jdW6mmvvmMZdyOJILde6a%2Fuil1APn8GgMtgabpCehC2ioh4u8Yja7y1Kv%2F5tCdTDoyKci8xdLTaJ9%2FjmJ9nBuVgxvgSPzYME%2F%2Fd0toG8HQEcSAYChf5fa6Zqg7vEOOKOSbc%2B1BJDhPPaYkm7Qjs3Br95L1aCmYGVi1jekkpSgUaJg5Y6%2BgG0lwohVAeKD7%2BXID9Gnt%2BwuFuvjkbs8os16cAMgyWDpE1wRNQzdOdd%2Fw8z5%2FKZEIDEesGNyGDADg5xkY9ZWfYhWdheenCVvYAHlYovKeVfxyN%2BOmJrbDCqTSviO2J17OkzGv4y0l4CyrpPzOGAwNY5iGsbK6soMquDTRu%2BEGhvNnW0JT1GuzFSHr30AedTXbSO5j4S2qHacklNq9LQ9qaKiA%2BTPVt5vBbRa1f3l3DEOEigQkNpONR7lhpeGppNoSY7W1sYgTdDCTLMhjwbFwhD44fYPv1x3mdfgPtKqbztOS7PXf%2BZzn0ZF12jeILle2HeTs5pGizFnSkzJk7heh9OqDKS5pM3SINasdCho0dGA0g8c31Cn9ouAJg52VIG5RNLl0psrPib478oQ38bsCoc%2FKB%2F5jYaBoMewd8%2BH3oZsO3Yxu2YHqBKmrnrAN02ZXNkrbnmFgu1D%2FQ%3D%3D--Zj4P655t98b0gSQr--eyPUtR93b2R0uQyVpVIvUg%3D%3D; __cfwaitingroom=ChhENTBXaGtVaFhkSGt3WFpGQWE4THRRPT0S1AEwUERrTDdJbnZIeTFhZ3RJOGxHL1BJYXloNE5tV0ZzNzU2MzNsN3pNRmR0anFjTnM2NHl1VEx1b202eDAwYjhha1BWSkUwVXFNUjNlcS9WRGROQTA0T1JDeGVpb3JnSlVnR2tSdWxVNTlxL2VSWkxINTJLd3dQRllObUFndGZkTkRkNUkxalR3bXRlSVp1VXJKOFEzVysxdkJvOEp5Z0pNWG1oRUpBYWJ4MTIreEs0SlBYZmRjMVBpUENxeElnR0xRTXFFZHEyaXVSRDFKYW9LOUZjTQ%3D%3D'
const csrfToken = 'wpJRpTLYnUfq1I3lxDPPmqOuQXXC+1tYk3VGLrSIKWzmgH21AjG/nfT4cgQlnJmI64WGx1SBTeyEalBtqUNnKQ=='

function log(...msg) {
  console.log(new Date().toISOString(), ...msg);
}

function error(msg) {
  console.error(new Date().toISOString(), msg);
}

function updateLinkDate(link) {
  return link.replace(/\d{4}-\d{2}-\d{2}/, format(new Date(), "yyyy-MM-dd"));
}

function updateLinkDatePfizer(link) {
  return link.replace(/\d{4}-\d{2}-\d{2}/, format(add(new Date(), {days: 42}), "yyyy-MM-dd"));
}

async function hasSuitableDate(data, bookingLink, xhrLink, secondShotXhrLink) {
  try {
    if (data.total > 0) {

      if (secondShotXhrLink) {
        const secondShotData = (
          await axios.get(updateLinkDatePfizer(secondShotXhrLink))
        ).data;

        log('second shot data', secondShotData);

        return secondShotData.total !== 0;
      }
    }

    // if (data.next_slot && data.next_slot.startsWith("2021-05")) {
    //   const newData = (
    //     await axios.get(xhrLink.replace(/\d{4}-\d{2}-\d{2}/, data.next_slot))
    //   ).data;

    //   log("further checking for specific later date", xhrLink);

    //   for (availability of newData.availabilities) {
    //     if (availability.slots.length > 0) {
    //       log("More than one slot when requesting for new Date");
    //       return true;
    //     }
    //   }
    // }

    if (data.availabilities) {
      for (availability of data.availabilities) {
        if (availability.slots.length > 0) {
          for (let slot of availability.slots) {
            const url = new URL(
              xhrLink
            );
            const firstAppointement = await axios({
              method: 'POST',
              url: 'https://www.doctolib.fr/appointments.json',
              data: {
                "agenda_ids": url.searchParams.get('agenda_ids'),
                "practice_ids":[parseInt(url.searchParams.get('practice_ids'))],
                "appointment":{
                  "start_date": slot.start_date,
                  "visit_motive_ids": url.searchParams.get('visit_motive_ids'),
                  "profile_id":242652,
                  "source_action":"profile"
                }
              },
              headers: {
                'cookie': cookie,
                'x-csrf-token': csrfToken
              }
            }).catch(err => {
              console.log(err)
            })
            console.log(bookingLink + " FIRST SHOT")
            if (firstAppointement && firstAppointement.data && firstAppointement.data.error) {
              return false
            }
            
            const secondShotData = await axios.get(updateLinkDatePfizer(`https://www.doctolib.fr/second_shot_availabilities.json?start_date=2021-07-04&visit_motive_ids=${url.searchParams.get('visit_motive_ids')}&agenda_ids=${url.searchParams.get('agenda_ids')}&first_slot=${encodeURI(slot.start_date)}&insurance_sector=public&practice_ids=${url.searchParams.get('practice_ids')}&limit=4`))
            if (secondShotData && secondShotData.data) {
              for (secondShotAvailibity of secondShotData.data.availabilities) {
                if (secondShotAvailibity.slots.length > 0) {
                  for (let secondSlot of secondShotAvailibity.slots) {
                    let newCookie = ''
                    for (let setCookie of firstAppointement.headers['set-cookie']) {
                      newCookie += setCookie + ';'
                    }
                    const secondAppointement = await axios({
                      method: 'POST',
                      url: 'https://www.doctolib.fr/appointments.json',
                      data: {
                        "agenda_ids": url.searchParams.get('agenda_ids'),
                        "practice_ids":[parseInt(url.searchParams.get('practice_ids'))],
                        "appointment":{
                          "start_date": slot.start_date,
                          "visit_motive_ids": url.searchParams.get('visit_motive_ids'),
                          "profile_id": 242652,
                          "source_action": "profile"
                        },
                        "second_slot": secondSlot.start_date
                      },
                      headers: {
                        'cookie': newCookie,
                        'x-csrf-token': firstAppointement.headers['x-csrf-token']
                      }
                    }).catch(err => {
                      console.log(err)
                    })
                    console.log(bookingLink + " SECOND SHOT")
                    if (secondAppointement && secondAppointement.data && !secondAppointement.data.error) {
                      open('https://doctolib.fr' + secondAppointement.data.redirection)
                      return true
                    }
                    else {
                      return false
                    }
                  }
                }
              }
            }
          }
          return false;
        }
      }
      //log(`${data.availabilities.length} : ${bookingLink}`);
    }
  } catch (e) {
    error(e);
    return false;
  }
}

function notify() {
  console.log("\u0007");

  notifier.notify({
    title: "Vacination",
    message: "Appointment!",
  });

  player.play("./bell-ring-01.wav", (err) => {
    if (error) {
      console.error(err);
    }
  });
}

const centers = [
'centre-de-vaccination-covid-19-ville-de-paris',
'centre-covid19-paris-5',
'centre-de-vaccination-grand-chambery',
'centre-de-vaccination-covid-19-mairie-du-6eme-arrondissement-de-paris',
'centre-de-vaccination-mairie-du-7eme-paris',
'centre-de-vaccination-covid-19-paris-8e',
'centre-de-vaccination-covid-mairie-du-9eme-arrondissement',
'centre-de-vaccination-covid-19-centre-medical-international-cmi',
'centre-de-vaccination-covid-centre-de-sante-bauchat-nation',
'centre-de-vaccination-covid-19-des-sapeurs-pompiers-de-paris',
'centre-de-vaccination-paris-14e',
'centre-medical-institut-pasteur-cmip-vaccination-covid-19',
'centre-de-vaccination-covid-centre-henry-dunant-croix-rouge-francaise',
'centre-de-vaccination-covid-paris-15e',
'vaccinodrome-covid-19-porte-de-versailles',
'centre-de-vaccination-covid-19-mairie-du-16eme-arrondissement',
'centre-de-vaccination-covid-19-paris-17eme',
'sos-medecins-paris',
'ars-idf-centre-covisan-cpts-paris-18',
'centre-de-vaccination-paris-19eme',
'cvc-cpts-ump',
'centre-de-vaccination-covid-19-stade-de-france',
'centre-de-vaccination-covid-19-ivry-sur-seine',
'centre-de-vaccination-covid-19-vitry-sur-seine',
'centre-de-vaccination-ambulatoire-d-alfortville-reserve-aux-professionnels-de-sante',
'centre-de-vaccination-covid-19-choisy-le-roi',
'centre-de-vaccination-covid-ville-de-creteil',
'centre-de-vaccinations-covid-saint-mande',
]

async function loadCenters() {
  const dataResults = []
  for (let center of centers) {
    const booking = await axios.get(`https://www.doctolib.fr/booking/${center}.json`)
    const data = booking.data.data

    if (!data) {
      console.log('No booking ' + center)
      continue
    }
    
    let visitMotivIds = []
    for (let motive of data.visit_motives) {
      if (motive.name.indexOf('1re injection') === 0 && motive.name.indexOf('AstraZeneca') < 0) {
        visitMotivIds.push(motive.id)
      }
    }

    for (const motiveId of visitMotivIds) {
      for (const place of data.places) {
        const practice_ids = place.practice_ids[0]
        const agendas = []
        for (let agenda of data.agendas) {
          if (agenda.practice_id === practice_ids && !agenda.booking_disabled && agenda.visit_motive_ids.indexOf(motiveId) >= 0) {
            agendas.push(agenda.id)
          }
        }
        if (agendas.length === 0) {
          continue;
        }
        const agenda_ids = agendas.join('-')

        const options = {
          "start_date": "2020-05-20",
          "visit_motive_ids": motiveId,
          "agenda_ids": agenda_ids,
          "practice_ids": practice_ids,
          "insurance_sector": "public",
          "destroy_temporary": "true",
          "limit":2
        }
        dataResults.push({
          xhrLink: `https://www.doctolib.fr/availabilities.json?start_date=${options.start_date}&visit_motive_ids=${options.visit_motive_ids}&agenda_ids=${options.agenda_ids}&insurance_sector=${options.insurance_sector}&practice_ids=${options.practice_ids}&destroy_temporary=${options.destroy_temporary}&limit=${options.limit}`,
          bookingLink: `https://www.doctolib.fr/${center}?pid=practice-${practice_ids}`,
        })
      }
    }
  }
  console.log(JSON.stringify(dataResults))
}

function observe(xhrLink, bookingLink, secondShotXhrLink) {
  const reschedule = (time) => {
    setTimeout(
      () => observe(xhrLink, bookingLink),
      Math.ceil(time || Math.random() * 1000)
    );
  };

  // log("checking directly");
  axios
    .get(updateLinkDate(xhrLink))
    .then(async (response) => {
      try {
        const isSuitable = await hasSuitableDate(response.data, bookingLink, xhrLink, secondShotXhrLink);
        if (isSuitable) {
          log("direct success", response.data, bookingLink);

          notify();

          reschedule();
        }
      } catch (e) {
        error(e);
      }
      reschedule();
    })
    .catch((e) => {
      error(e);
      reschedule();
    });
}

let recentlyOpened = false;

const data = [
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=440074-433984-434489-415625-440078-434472-434486-440075-440077-433601-415628-433997-462177-462452-462178-440076-434477-434466-433604-434490&insurance_sector=public&practice_ids=164922&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-164922"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=407696-418656&insurance_sector=public&practice_ids=164925&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-164925"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=415635-415634-415630-434163-434159-434175-434179&insurance_sector=public&practice_ids=164812&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-164812"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=434411-434414-434515-433204-434413-434514-415620-441863-434516-434412&insurance_sector=public&practice_ids=164924&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-164924"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=434425-440000-434424-414972-415617-434428-434423-434051-433571-434430-415619-434433-434452-434455-434435-464341-434456-434458-434437-434449-434421-434420&insurance_sector=public&practice_ids=164926&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-164926"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=440654-447048-434343-475255-463168-429620-463171-462614-434052-440655-462613-434338-433994-415613-463167-475254-415615-463170-434337-463166&insurance_sector=public&practice_ids=166459&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-166459"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=434432-434426-434434-462901-434431-434427-434429&insurance_sector=public&practice_ids=175177&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-175177"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549915&agenda_ids=441742-448950-448946-462658-439859-441741-439860-438595-448954-447599-448957-448952&insurance_sector=public&practice_ids=176642&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-176642"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549920&agenda_ids=434425-434424-415617-434428-434423-433571-434430-434433-434452-434455-464341-434449-434421-434420&insurance_sector=public&practice_ids=164926&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-164926"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549920&agenda_ids=440654-447048-434343-463168-429620-463171-462614-434052-440655-462613-434338-433994-415613-463167-415615-463170-434337-463166&insurance_sector=public&practice_ids=166459&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-166459"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549920&agenda_ids=441742-448950-448946-462658-439859-441741-439860-438595-448954-447599-448957-448952&insurance_sector=public&practice_ids=176642&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ville-de-paris?pid=practice-176642"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2860338&agenda_ids=409357&insurance_sector=public&practice_ids=124877&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-covid19-paris-5?pid=practice-124877"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2551398&agenda_ids=411636-411957-439808-432671-414727&insurance_sector=public&practice_ids=179218&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-mairie-du-7eme-paris?pid=practice-179218"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2840463&agenda_ids=411901-434355-454974-411900-432437-411898-454973&insurance_sector=public&practice_ids=165089&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-paris-8e?pid=practice-165089"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2548398&agenda_ids=442007-410722&insurance_sector=public&practice_ids=164617&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-mairie-du-9eme-arrondissement?pid=practice-164617"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2554449&agenda_ids=418046-412688-412687&insurance_sector=public&practice_ids=165403&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-centre-de-sante-bauchat-nation?pid=practice-165403"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2548939&agenda_ids=466677-410948-466673-412039-466679-466676-466680-412036-466675&insurance_sector=public&practice_ids=164733&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-paris-14e?pid=practice-164733"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2548939&agenda_ids=466749-466744-466746-466748&insurance_sector=public&practice_ids=185173&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-paris-14e?pid=practice-185173"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549775&agenda_ids=411154-411935-423750-411937&insurance_sector=public&practice_ids=164810&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-medical-institut-pasteur-cmip-vaccination-covid-19?pid=practice-164810"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2835739&agenda_ids=411154-464512-411935-423750-411937&insurance_sector=public&practice_ids=164810&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-medical-institut-pasteur-cmip-vaccination-covid-19?pid=practice-164810"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2552122&agenda_ids=412013-412427-412651-432679-417116-427281&insurance_sector=public&practice_ids=165139&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-centre-henry-dunant-croix-rouge-francaise?pid=practice-165139"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2553445&agenda_ids=472339-472341-412405-462686-434831-425344-472340-462687-464260-462683-425345-412409-412407-435300&insurance_sector=public&practice_ids=165280&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-paris-15e?pid=practice-165280"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2701634&agenda_ids=444603-442111-467649-439605-439606&insurance_sector=public&practice_ids=176976&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-mairie-du-16eme-arrondissement?pid=practice-176976"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2697927&agenda_ids=443556-453863-438619-438621&insurance_sector=public&practice_ids=176666&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-paris-17eme?pid=practice-176666"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2836421&agenda_ids=469352&insurance_sector=public&practice_ids=176666&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-paris-17eme?pid=practice-176666"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2554319&agenda_ids=465149-423723-415462-412564-464384-412566-437152-432746&insurance_sector=public&practice_ids=165129&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/sos-medecins-paris?pid=practice-165129"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2726262&agenda_ids=475036-470421-425392-425408-470420-436935-467729&insurance_sector=public&practice_ids=164740&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/ars-idf-centre-covisan-cpts-paris-18?pid=practice-164740"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2816532&agenda_ids=475036-470421-425392-425408-470420-436935-467729&insurance_sector=public&practice_ids=164740&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/ars-idf-centre-covisan-cpts-paris-18?pid=practice-164740"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2735278&agenda_ids=447375-447378-447376-447377-447373&insurance_sector=public&practice_ids=179894&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-stade-de-france?pid=practice-179894"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2735280&agenda_ids=450180-450173-450174-450179-450181-450177-450176-450178-450175&insurance_sector=public&practice_ids=179894&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-stade-de-france?pid=practice-179894"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2696672&agenda_ids=475614-475616-443646-438313&insurance_sector=public&practice_ids=176560&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-ivry-sur-seine?pid=practice-176560"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2734033&agenda_ids=454457-454458-454460-466936-466937-466938-447140-447141-447142&insurance_sector=public&practice_ids=179776&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-vitry-sur-seine?pid=practice-179776"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2550183&agenda_ids=411279-411278-476061-463647&insurance_sector=public&practice_ids=164848&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-ambulatoire-d-alfortville-reserve-aux-professionnels-de-sante?pid=practice-164848"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2686887&agenda_ids=472762&insurance_sector=public&practice_ids=175848&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-19-choisy-le-roi?pid=practice-175848"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2555463&agenda_ids=448106-448111-471675-471672-471680-412699-412697-471681&insurance_sector=public&practice_ids=165411&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccination-covid-ville-de-creteil?pid=practice-165411"
  },
  {
      "xhrLink": "https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2535227&agenda_ids=433521-433533-446545&insurance_sector=public&practice_ids=163548&destroy_temporary=true&limit=2",
      "bookingLink": "https://www.doctolib.fr/vaccination-covid-19/paris/centre-de-vaccinations-covid-saint-mande?pid=practice-163548"
  }
];

const data2 = [{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2860338&agenda_ids=409357&insurance_sector=public&practice_ids=124877&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-covid19-paris-5?pid=practice-124877"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2551398&agenda_ids=411636-411957-439808-432671-414727&insurance_sector=public&practice_ids=179218&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-mairie-du-7eme-paris?pid=practice-179218"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2840463&agenda_ids=411901-434355-454974-411900-432437-411898-454973&insurance_sector=public&practice_ids=165089&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-paris-8e?pid=practice-165089"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2548398&agenda_ids=442007-410722&insurance_sector=public&practice_ids=164617&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-mairie-du-9eme-arrondissement?pid=practice-164617"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2551523&agenda_ids=411699&insurance_sector=public&practice_ids=165042&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-centre-medical-international-cmi?pid=practice-165042"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2840830&agenda_ids=468337&insurance_sector=public&practice_ids=165042&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-centre-medical-international-cmi?pid=practice-165042"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2554449&agenda_ids=418046-412688-412687&insurance_sector=public&practice_ids=165403&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-centre-de-sante-bauchat-nation?pid=practice-165403"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2548939&agenda_ids=466677-410948-466673-412039-466679-466676-466680-412036-466675&insurance_sector=public&practice_ids=164733&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-paris-14e?pid=practice-164733"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2548939&agenda_ids=466749-466744-466746-466748&insurance_sector=public&practice_ids=185173&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-paris-14e?pid=practice-185173"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2549775&agenda_ids=411154-411935-423750-411937&insurance_sector=public&practice_ids=164810&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-medical-institut-pasteur-cmip-vaccination-covid-19?pid=practice-164810"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2835739&agenda_ids=411154-464512-411935-423750-411937&insurance_sector=public&practice_ids=164810&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-medical-institut-pasteur-cmip-vaccination-covid-19?pid=practice-164810"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2552122&agenda_ids=412013-412427-412651-432679-417116-427281&insurance_sector=public&practice_ids=165139&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-centre-henry-dunant-croix-rouge-francaise?pid=practice-165139"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2553445&agenda_ids=472339-472341-412405-462686-434831-425344-472340-462687-464260-462683-425345-412409-412407-435300&insurance_sector=public&practice_ids=165280&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-paris-15e?pid=practice-165280"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2701634&agenda_ids=444603-442111-467649-439605-439606&insurance_sector=public&practice_ids=176976&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-mairie-du-16eme-arrondissement?pid=practice-176976"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2697927&agenda_ids=443556-453863-438619-438621&insurance_sector=public&practice_ids=176666&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-paris-17eme?pid=practice-176666"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2836421&agenda_ids=469352&insurance_sector=public&practice_ids=176666&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-paris-17eme?pid=practice-176666"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2554319&agenda_ids=465149-423723-415462-412564-464384-412566-437152-432746&insurance_sector=public&practice_ids=165129&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/sos-medecins-paris?pid=practice-165129"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2726262&agenda_ids=475036-470421-425392-425408-470420-436935-467729&insurance_sector=public&practice_ids=164740&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/ars-idf-centre-covisan-cpts-paris-18?pid=practice-164740"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2816532&agenda_ids=475036-470421-425392-425408-470420-436935-467729&insurance_sector=public&practice_ids=164740&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/ars-idf-centre-covisan-cpts-paris-18?pid=practice-164740"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2735278&agenda_ids=447375-447378-447376-447377-447373&insurance_sector=public&practice_ids=179894&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-stade-de-france?pid=practice-179894"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2735280&agenda_ids=450180-450173-450174-450179-450181-450177-450176-450178-450175&insurance_sector=public&practice_ids=179894&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-stade-de-france?pid=practice-179894"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2696672&agenda_ids=475614-475616-443646-438313&insurance_sector=public&practice_ids=176560&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-ivry-sur-seine?pid=practice-176560"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2734033&agenda_ids=454457-454458-454460-466936-466937-466938-447140-447141-447142&insurance_sector=public&practice_ids=179776&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-vitry-sur-seine?pid=practice-179776"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2550183&agenda_ids=411279-411278-476061-463647&insurance_sector=public&practice_ids=164848&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-ambulatoire-d-alfortville-reserve-aux-professionnels-de-sante?pid=practice-164848"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2686887&agenda_ids=472762&insurance_sector=public&practice_ids=175848&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-19-choisy-le-roi?pid=practice-175848"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2555463&agenda_ids=448106-448111-471675-471672-471680-412699-412697-471681&insurance_sector=public&practice_ids=165411&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccination-covid-ville-de-creteil?pid=practice-165411"},{"xhrLink":"https://www.doctolib.fr/availabilities.json?start_date=2020-05-20&visit_motive_ids=2535227&agenda_ids=433521-433533-446545&insurance_sector=public&practice_ids=163548&destroy_temporary=true&limit=2","bookingLink":"https://www.doctolib.fr/centre-de-vaccinations-covid-saint-mande?pid=practice-163548"}]

data.forEach((links) => {
  observe(links.xhrLink, links.bookingLink);
});

// Comment back in to observe impfstoff.link for availabilities.
// observeImpfstoff();

// loadCenters()

console.log("Started checking periodically...")
console.log("Just keep it running, it will play a sound and open a browser when an appointment opens up")
