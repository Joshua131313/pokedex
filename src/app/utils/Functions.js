import firebase from "firebase";
import { db } from "../../Fire";
import alltypes from '../data/alltypes.json'

export function writeUserdocuments(user, email, name, cover = "") {
  db.collection("users")
    .doc(user.uid)
    .set({
      userinfo: {
        uid: user.uid,
        cover: cover,
        email,
        name
      },
      shinyArray: [],
      searchResult: [],
      selectedPoke: [],
      teams: []
    });
}

export const loginwithProvider = (provider, navigate) => {
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        const user = result.user;
        writeUserdocuments(user, user.email, user.displayName, user.photoURL);
      }
      navigate()
    });
};
export const detailsWidth = (hideDetails) => {
  let obj = {
    width: 300,
    gap: 10
  };
  if (hideDetails) {
    obj = {
      width: 0,
      gap: 0
    };
  } else {
    obj = {
      width: 300,
      gap: 10
    };
  }
  return obj;
};
const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};
export const determineColor = (type) => {
  if (colors[type]) {
    return colors[type];
  } else return colors.normal;
};
export const clean = (text) => text.replace(/[^a-zA-Z0-9 ]/g, "");

export const replaceSpecialChar = (text) => {
  return text && text.replace(/[^a-zA-Z.é', ]/g, " ");
};
export const getef = (a, b) => {
  // keys is a list of letters found in the types of attacks/defenses
  let keys = [..."BWSEIRNulkcDPotyeG"];

  // getIndex is a single case statement.
  // it checks each of keys, one-by-one, falling through until we've found the proper index
  let getIndex = (x) => keys.findIndex((c) => x.match(c));

  // encodedValues is a list, indexed by `keys`, where each value is 7-characters.
  let encodedValues =
    "kjwhcgnj2xd6elihtlneemw82duxijsazl3sh4iz5akjmlmsqds06xf1sbb8d0rl1nu7a2kjwi3mykjwlbpmk1up4mzl1iuenedor0bdmkjwmpk6rhcg4h3en3pew5";

  // the 7-character value (e.g., B=0="kjwhcgn", W=1="j2xd6el") were created by
  // turning base4 values into base36, so let's turn this back into a string the same way
  let valuesForAttack = parseInt(
    encodedValues.substr(getIndex(a) * 7, 7),
    36
  ).toString(4);

  // valuesForAttack is indexed by defenseType.  The value will be 0..3, depending on the multiplier

  // let's get an array of the multipliers and reduce...
  let multiplier = b
    .split("/")
    .reduce(
      (oldMultiplier, defenseType) =>
        oldMultiplier * [0, 0.5, 1, 2][valuesForAttack[getIndex(defenseType)]],
      1
    );

  return multiplier + "x";
};

export default function getMultipliers(types) {
  let multipliers = {
    defense: {},
    attack: {}
  };
  types.forEach((type) => {
    let damage_relations = alltypes[type];
    let no_damage_to = damage_relations.attack.zero;
    let no_damage_from = damage_relations.defense.zero;
    let half_damage_to = damage_relations.attack.half;
    let half_damage_from = damage_relations.defense.half;
    let double_damage_to = damage_relations.attack.double;
    let double_damage_from = damage_relations.defense.double;
    no_damage_to.forEach((type) => {
      if (multipliers.attack.hasOwnProperty(type)) {
        multipliers.attack[type] = multipliers.attack[type] * 0;
      } else {
        multipliers.attack[type] = 0;
      }
    });
    no_damage_from.forEach((type) => {
      if (multipliers.defense.hasOwnProperty(type)) {
        multipliers.defense[type] = multipliers.defense[type] * 0;
      } else {
        multipliers.defense[type] = 0;
      }
    });
    half_damage_to.forEach((type) => {
      if (multipliers.attack.hasOwnProperty(type)) {
        multipliers.attack[type] = multipliers.attack[type] * 0.5;
      } else {
        multipliers.attack[type] = 0.5;
      }
    });
    half_damage_from.forEach((type) => {
      if (multipliers.defense.hasOwnProperty(type)) {
        multipliers.defense[type] = multipliers.defense[type] * 0.5;
      } else {
        multipliers.defense[type] = 0.5;
      }
    });
    double_damage_to.forEach((type) => {
      if (multipliers.attack.hasOwnProperty(type)) {
        multipliers.attack[type] = multipliers.attack[type] * 2;
      } else {
        multipliers.attack[type] = 2;
      }
    });
    double_damage_from.forEach((type) => {
      if (multipliers.defense.hasOwnProperty(type)) {
        multipliers.defense[type] = multipliers.defense[type] * 2;
      } else {
        multipliers.defense[type] = 2;
      }
    });
  });
  return multipliers;
}
export const reduceTypes = (types) => {
  let red = types?.reduce((prev, cur) => {
    return [...prev, cur.type.name];
  }, []);
  return red;
};
export const getStrengths = (multipliers) => {
  let strengths = [];
  Object.keys(multipliers.attack).map((key) => {
    if (multipliers.attack[key] >= 2) {
      strengths.push({ type: key, multiplier: multipliers.attack[key] });
    }
  });
  return strengths;
};
export const getWeaknesses = (selectedPoke) => {
  if (selectedPoke?.id) {
    let reducedtypes = reduceTypes(selectedPoke?.types) || [];
    const multipliers = reducedtypes.length && getMultipliers(reducedtypes);

    let weakness = [];
    Object.keys(multipliers.defense).map((key) => {
      if (multipliers.defense[key] >= 2) {
        weakness.push({ type: key, multiplier: multipliers.defense[key] });
      }
    });
    return weakness;
  } else return null;
};
const stats = {
  hp: {
    color: "#df2140",
    text: "HP"
  },
  "special-defense": {
    color: "#a8f083",
    text: "SpD"
  },
  "special-attack": {
    color: "#85ddff",
    text: "SpA"
  },
  attack: {
    color: "#fa994d",
    text: "Atk"
  },
  defense: {
    color: "#fedc61",
    text: "DEF"
  },
  speed: {
    color: "#fb94a8",
    text: "SPD"
  },
  total: {
    color: "#86a8ff",
    text: "TOT"
  }
};
export const getStat = (stat) => {
  return stats[stat];
};
export const determineEvolutionText = (trigger) => {
  let obj = {};
  switch (trigger) {
    case "use-item":
      obj = { text: "", img: true };
      break;
    case "level-up":
      obj = { text: "Lv", img: false };
      break;
    case "trade":
      obj = { text: "Trade", img: false };
      break;
    default:
      obj = { text: "", img: false };
  }
  return obj;
};
export const getCardSizes = (
  width,
  defaultvalue,
  defaultwidth,
  ignoreInline
) => {
  if (ignoreInline) {
    return null;
  } else {
    return width / (defaultwidth / defaultvalue);
  }
};

export const editState = (state, id, idKey) => {
  let tempState = [...state]
  let index = tempState.findIndex(x=> x[idKey] === id)
  return {
    tempState,
    index
  }
}