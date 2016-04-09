function Character(params)
{
	this.name       = params.name     || 'Dumbass';
	this.level      = params.level    || 1;
	this.argent     = params.argent;
	this.equipement = {};
	this.agilite    = {
		name: 'Agilité',
		skills: {
			combat:     params.skills.agilite.combat     || 4,
			tir:        params.skills.agilite.tir        || 4,
			lancer:     params.skills.agilite.lancer     || 4,
			discretion: params.skills.agilite.discretion || 4,
			crochetage: params.skills.agilite.crochetage || 4,
			equitation: params.skills.agilite.equitation || 4,
			natation:   params.skills.agilite.natation   || 4,
			conduite:   params.skills.agilite.conduite   || 4,
			navigation: params.skills.agilite.navigation || 4,
			pilotage:   params.skills.agilite.combat     || 4,
		},
		level: params.skills.agilite.level || 4
	};
	this.intellect = {
		name: 'Intellect',
		skills: {
			perception:    params.skills.intellect.perception    || 4,
			pister:        params.skills.intellect.pister        || 4,
			survie:        params.skills.intellect.survie        || 4,
			investigation: params.skills.intellect.investigation || 4,
			rue:           params.skills.intellect.rue           || 4,
			jeu:           params.skills.intellect.jeu           || 4,
			soins:         params.skills.intellect.soins         || 4,
			reparation:    params.skills.intellect.reparation    || 4,
			sarcasmes:     params.skills.intellect.sarcasmes     || 4,
		},
		level: params.skills.intellect.level || 4
	};
	this.ame = {
		name: 'Ame',
		skills: {
			tripes:       params.skills.ame.tripes       || 4,
			intimidation: params.skills.ame.intimidation || 4,
			persuasion:   params.skills.ame.persuasion   || 4,
			foi:          params.skills.ame.foi          || 4,
			medecine:     params.skills.ame.medecine     || 4,
		},
		level: params.skills.ame.level || 4
	};
	this.force = {
		name: 'Force',
		skills: {
			escalade: params.skills.force.escalade || 4,
		},
		level: params.skills.force.level || 4
	};
	this.vigueur = {
		name: 'Vigueur',
		skills: { },
		level: params.skills.vigueur.level || 4
	};
	this.trempe     = params.trempe   || 1;
	this.charisme   = params.charisme || 0;
	this.allure     = params.allure   || 6;
	this.parade     = 2 + (this.agilite.skills.combat / 2);
	this.resistance = 2 + (this.vigueur.level / 2);

	this.init(params);
}

Character.prototype =
{
	upgradeCarac: function (carac, value)
	{
		var value = typeof value !== 'undefined' ? value * 2 : 2;

		this[carac].level += value;

		if (this[carac].level > 12)
			this[carac].level = 12;
		else if (this[carac].level < 0)
			this[carac].level = 0;
	},
	upgradeSkill: function (carac, skill, value)
	{
		var value = typeof value !== 'undefined' ? value * 2 : 2;

		this[carac][skill].level += value;

		if (this[carac][skill].level > 12)
			this[carac][skill].level = 12;
		else if (this[carac][skill].level < 0)
			this[carac][skill].level = 0;
	},
	init: function (params)
	{
		this.initEquipment(params);
	},
	initEquipment: function (params)
	{
		this.equipement.armes = params.equipement.armes;
		this.equipement.objets = params.equipement.objets;
	}
}

var noe = new Character({
	name: 'Chong Ji Lee',
	level: 1,
	skills: {
		agilite: {
			level: 6,
			combat: 6,
			tir: 6,
			navigation: 6
		},
		intellect: {
			level: 8,
			perception: 10,
			survie: 8,
			soins: 6,
		},
		ame: {
			level: 6,
			tripes: 6,
			intimidation: 6,
			persuasion: 8
		},
		force: { level: 6 },
		vigueur: 4
	},
	handicaps: [
		{ name: "Code d'honneur" },
		{ name: "Etranger" },
		{ name: "Loyal" }

	],
	atouts: [
		{ name: "Arts Martiaux" },
		{ name: "Charismatique" }

	],
	equipement: {
		armes: [
			{
				name: 'Winchester',
				poids: 4
			},
			{
				name: 'Poing Américain',
				poids: 0.5
			},
			{
				name: 'Poing Américain',
				poids: 0.5
			},
			{
				name: 'Sabre',
				poids: 2
			},
			{
				name: 'Peacemaker',
				poids: 1
			}
		],
		objets: [
			{ name: 'Bottes', poids: 2 },
			{ name: 'Calecon', poids: 1 },
			{ name: 'Jambieres', poids: 3 },
			{ name: 'Cache Poussière', poids: 10 },
			{ name: 'Sac de Couchage', poids: 5 },
			{ name: 'Sac à Dos', poids: 1.5 },
			{ name: 'Pipe Asiatique en Ivoire', poids: 0.750 },
			{ name: 'Bourse à Tabac', poids: 0.5 },
			{ name: 'Lanterne', poids: 2 },
			{ name: 'Huile à Lanterne', poids: 3 },
			{ name: 'Hache', poids: 2.5 },
			{ name: 'Corde', poids: 4, quantite: 15 },
			{ name: 'Appareil Photo', poids: 2.5 },
			{ name: 'Plaque', poids: 0.250 },
			{ name: 'Alumettes', poids: 0.250, quantite: 200 },
			{ name: 'Pelle', poids: 2.5 },
			{ name: 'Ceinturon', poids: 0.5 },
			{ name: 'Holster Rapide', poids: 0.5 },
			{ name: 'Lanière Fusil', poids: 0 },
			{ name: 'Poele', poids: 2.5 },
			{ name: 'Gamelle', poids: 1 },
			{ name: 'Bacon', poids: 1 },
			{ name: 'Cafe', poids: 1 },
			{ name: 'Cartouches Pistolet', poids: 0, quantite: 100 },
			{ name: 'Cartouches Winchester', poids: 0, quantite: 40 },
		]
	},
	argent: 60
});

console.log(JSON.stringify(noe));
