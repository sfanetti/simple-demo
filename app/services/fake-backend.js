import Service from '@ember/service';
import {v4 as uuidv4} from 'uuid';
import StorageProvider, { STORAGE_LOCAL } from '../util/storage-provider';

const FAKE_HOST = 'fake_host';

const GEO_BOUNDS = {
    NE: {lat: 47.2643, lng: -68.6206 },
    SE: {lat: 30.3859, lng: -82.2025 },
    NW: {lat: 49.0023, lng: -123.3215 },
    SW: {lat: 32.7573, lng: -114.5284 }
};

const { NE, SE, NW, SW } = GEO_BOUNDS;
const LNG_TOP_RANGE = Math.abs(NW.lng) - Math.abs(NE.lng);
const LNG_BTM_RANGE = Math.abs(SW.lng) - Math.abs(SE.lng);
const LAT_RIGHT_RANGE = NE.lat - SE.lat;
const LAT_LEFT_RANGE = NW.lat - SW.lat;

const AVERAGE_LNG_RANGE = (LNG_TOP_RANGE + LNG_BTM_RANGE)/2;
const AVERAGE_LAT_RANGE = (LAT_RIGHT_RANGE + LAT_LEFT_RANGE)/2;

const AVERAGE_LEFT = -(Math.abs(NW.lng) + Math.abs(SW.lng))/2;
const AVERAGE_BOTTOM = (SW.lat + SE.lat)/2;

const TREATMENT_TYPES = [
    'Coaching',
    'Intro Evaluation',
    'X-Ray Vaporizing',
    'Width Burning: Weight Loss .Class',
    'Gleaming the Cube',
    'Caring for Grandma',
    'Watching Bad Movies',
    'Listening to Cats',
    'Cranial Drilling',
    'Responsible Curling',
    'Afghan Rug Surgery',
    'Compiling Quake on a 486',
    'Smelling the Roses',
    'Hot Temperature Therapy',
    'Recreational Hard Cider',
    'Can U Bus: Driving Lit',
    'Anger Issues with Kids',
    'Cat Identification for the Allergic',
    'Allergy Identification for Cats',
    'Stranger Danger: A Therapy',
    'Smothering The Pain With Ice Cream',
    'Hating On Your Neighbors',
    'Scream Therapy for Eczema',
    "Cancelling Your Parents",
    "Willing Away Fear with Bunnies",
    "Campers: Dealing with them",
    "Birds are not real",
    "Fear of the Simulation",
    "Changing your Mind about Yoga",
    "Kicking Sand: Be the Beach",
    "Window Shopping for Consciousness",
    "Lobster Fail: A Therapy",
    "Memory & Me: Uncle Billy Therapy",
    "Loneliness Therapy",
    "Idea Drain and You",
    "Focus Music: Nickelback",
    "X : Nuff said",
    "Dance Therapy for Llamas",
    "Stgmatization and Beans",
    "Mindfulness for the Mindless"
];
const OFFICE_NAMES = [
    'Big Jim\'s House of Cranial Drilling',
    'Peterson and Michaels DDS',
    'Zagnut Jenkinkirk LLC',
    'Prinze Associates',
    'Dr. Bartholomew P Jones MD',
    'Witch Doctor Medical',
    'Open Wound Society',
    'Morgan Consulting',
    'Bob Newhart Counseling',
    'Einstein Patel Psychiatry',
    'Exeter Entering',
    'West Side Offices',
    'Novartrunions Medical',
    'Dr Emmit Brown Phd',
    'Martin McFly Coaching',
    "Timons & Crowe MD",
    "Tubbs & Crocket LLC",
    "Bartles & James MD, Phd",
    "Bert & Earnie TCBY",
    "Bert & Earnie Counseling",
    "Bedford Falls Psychology",
    "Baily Brothers Counseling",
    "Potter Coaching",
    "Butters & Chaus NFT Therapy",
    "Banks Associates",
    "Cooks Associates",
    "Staff Psychologists Inc",
    "Fancier Dancers Counseling"
];

const randomOfSize = (size, lowerBound) => {
    return Math.floor((Math.random() * size) + lowerBound)
};

const getDuration = (increments = 15, max = 150) => {
    if (!increments) throw 'NO! bad getDuration';
    return randomOfSize(max / increments, 1) * increments;

};

const getCost = (increments = 10, max = 5000) => {
    if (!increments) throw 'NO! bad getCost';
    return randomOfSize(max / increments, 0) * increments;
};

const getGeoLocation = () => {
    const randLngInRange = Math.random() * AVERAGE_LNG_RANGE;
    const randLatInRange = Math.random() * AVERAGE_LAT_RANGE;


    const lng = AVERAGE_LEFT + randLngInRange;
    const lat = AVERAGE_BOTTOM + randLatInRange;
    return { lat, lng };
};

const getPhoneNumber = () => {
    return `(${randomOfSize(900, 100)}) ${randomOfSize(900, 100)} - ${randomOfSize(9000, 1000)}`
};

const getUrl = (host, id, type, pageNumber, pageSize, total) => {
    const pageSection = pageNumber && pageSize && total
        ? `?page%5Bnumber%5D=${pageNumber}&page%5Bsize%5D=${pageSize}` : '';
    const idSection = id ? `/${id}` : `/`;

    return `${host}/client-portal-api/${type}s${idSection}${pageSection}`;
};

const makeFakeOffice = (host, name, vidProb = 0.5, pubProb = 0.3) => {
    const id = uuidv4();
    const isVideo = Math.random() < vidProb;
    const isPublic = Math.random() < pubProb;
    return {
        "id": `${id}`,
        "type": "offices",
        "links": {
            "self": getUrl(host, id, 'office')
        },
        "attributes": {
            "name": name,
            "phone": getPhoneNumber(),
            "isVideo": isVideo,
            "geolocation": getGeoLocation(),
            "isPublic": isPublic
        }
    }
};

const makeFakeTreatment = (host, treatment, callProb) => {
    const id = uuidv4();
    const callToBook = Math.random() > callProb;
    return {
        "id": `${id}`,
        "type": "cptCodes",
        "links": {
            "self": getUrl(host, id, 'service')
        },
        "attributes": {
            "description": treatment,
            "duration": getDuration(),
            "rate": getCost(),
            "callToBook": callToBook
        }
    };
};


const getDepletingRandomCollection = (collection) => {
    const depleting = collection.concat();
    return () => {
        const index = Math.floor((Math.random() * depleting.length));
        return depleting.splice(index, 1).pop();
    };
};

const getClinician = () => {
    const id = uuidv4();
    return {
        id,
        name: `clinician ${id.substring(0, 8)}`,
        offices: [],
        treatments: [],
        host: FAKE_HOST
    };
};

const createClinicians = (host, count) => {
    if (!count) throw 'NO! bad creating clinicians';
    const treatments = getDepletingRandomCollection(TREATMENT_TYPES);
    const offices = getDepletingRandomCollection(OFFICE_NAMES);
    const clinicians = [];
    while (clinicians.length < count) {
        clinicians.push(getClinician());
    }
    let office, treatment, index = 0;

    do {
        office = offices();
        treatment = treatments();
        if (office) {
            clinicians[index].offices.push(makeFakeOffice(host, office));
        }
        if (treatments) {
            clinicians[index].treatments.push(makeFakeTreatment(host, treatment));
        }
        index = index + 1 < count ? index + 1 : 0;

    } while (office && treatment);
    return clinicians;
};

const getResponse = (type, host, data, pageNumber, pageSize, total) => {
    const totalPages = Math.ceil(total / pageSize);
    return {
        "data": data,
        "links": {
            "first": getUrl(host, null, type, pageNumber, pageSize, total),
            "last": getUrl(host, null, type, totalPages, pageSize, total),
        }
    }
};

const storage = StorageProvider.getStorage(STORAGE_LOCAL, 'simple-demo');
const KEY_CLINICIANS = `${FAKE_HOST}-Clinicians`;

export default class FakeBackendService extends Service {
    _clinicians = storage.getItem(KEY_CLINICIANS) || this.reset();

    get clinicians() {
        return this._clinicians.map(({id, name, host}) => {
            return {id, name, host}
        });
    }

    reset() {
        const clinicians = createClinicians(FAKE_HOST, 2);
        storage.setItem(KEY_CLINICIANS, clinicians);
        this._clinicians = clinicians;
        return clinicians;
    }


    returnFakeBackEndIfNecessary(host, store, type, query) {
        const {clinicianId, page } = query || {};
        if (host === FAKE_HOST) {
            const { number, size } = page || {};
            return this.getServiceResponse(host, type.modelName, clinicianId, number, size);
        }
        return null;
    }

    getServiceResponse(host, type, clinicianId, pageNumber = 1, pageSize = 5, when = Math.random() * 200) {
        let resolve;
        const CODE_TYPE = 'cpt-code';
        const clinician = this._clinicians.find(({id}) => id === clinicianId);

        setTimeout(() => {
            const startIndex = (pageNumber - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const collection = CODE_TYPE === type ? clinician.treatments : clinician.offices;
            const data = !clinician ? [] : collection.slice(startIndex, endIndex);

            const response = getResponse(type, host, data, pageNumber, pageSize, collection.length);
            resolve(response);
        }, when);
        return new Promise(res => {
            resolve = res;
        });
    }
}
