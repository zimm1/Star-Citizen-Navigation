const DB_PATH = '../../Database.json';
const SETTINGS_PATH = '../../settings.json';

const packaged = fs.existsSync(path.resolve(__dirname + '../../../../../Database.json'));
const filesPath = packaged ? '../../' : '';


export const getDatabase = () => {
    return require(filesPath + DB_PATH);
}

export const getSettings = () => {
    return require(filesPath + SETTINGS_PATH);
}

export const setDatabase = (db) => {
    fs.writeFile('Database.json', JSON.stringify(db, null, 4), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

export const setPOI = (name, container, x, y, z, qtMarker) => {
    const db = getDatabase();
    const pois = db["Containers"][container]["POI"];

    if (!poi.container) {
        throw Error("Container must be set");
    }
    if (!poi.name) {
        throw Error("Name must be set");
    }

    if (pois.find(p => p.name === poi.name)) {
        throw Error("POI altready exists");
    }

    db["Containers"][container]["POI"][name] = {
        "Name": name,
        "Container": container,
        "X": x,
        "Y": y,
        "Z": z,
        "QTMarker": qtMarker ? "TRUE" : "FALSE"
    }

    setDatabase(db);
}