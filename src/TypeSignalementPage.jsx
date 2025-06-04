import React, { useState } from "react";

// JSON dynamique fourni par l'utilisateur
const rawCategories = [
	{
		id: "atteintes_personnes",
		label: "Atteintes aux personnes",
		types: [
			{
				id: "suicide_danger",
				label: "Annonce de suicide / mise en danger",
				fields: [
					{ name: "description", type: "textarea", required: true },
					{ name: "date", type: "date", required: true },
					{ name: "plateforme", type: "text", required: false },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "localisation", type: "text", required: false },
					{ name: "contact_victime", type: "text", required: false },
				],
			},
			{
				id: "terrorisme",
				label: "Terrorisme / apologie / menace",
				fields: [
					{ name: "contenu", type: "textarea", required: true },
					{ name: "plateforme", type: "text", required: false },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "lien", type: "url", required: false },
					{ name: "date", type: "date", required: true },
				],
			},
			{
				id: "haine_violence",
				label: "Incitation à la haine / violence / discrimination",
				fields: [
					{ name: "auteur", type: "text", required: false },
					{ name: "plateforme", type: "text", required: true },
					{ name: "contenu", type: "textarea", required: true },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
			{
				id: "pedopornographie",
				label: "Pédopornographie / corruption de mineurs",
				fields: [
					{ name: "type_contenu", type: "text", required: true },
					{ name: "victime", type: "text", required: false },
					{ name: "plateforme", type: "text", required: false },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
		],
	},
	{
		id: "harcelement",
		label: "Harcèlement",
		types: [
			{
				id: "harcelement_ecole",
				label: "Harcèlement scolaire",
				fields: [
					{ name: "victime", type: "text", required: true },
					{ name: "etablissement", type: "text", required: true },
					{ name: "description", type: "textarea", required: true },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
			{
				id: "harcelement_travail",
				label: "Harcèlement au travail",
				fields: [
					{ name: "employeur", type: "text", required: false },
					{ name: "description", type: "textarea", required: true },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
		],
	},
	{
		id: "reseaux_sociaux",
		label: "Réseaux sociaux",
		types: [
			{
				id: "contenu_violent",
				label: "Contenu violent / haineux",
				fields: [
					{
						name: "reseau",
						type: "select",
						options: [
							"Facebook",
							"Instagram",
							"TikTok",
							"Twitter",
							"Snapchat",
						],
						required: true,
					},
					{ name: "lien", type: "url", required: true },
					{ name: "description", type: "textarea", required: true },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
			{
				id: "usurpation_profil",
				label: "Faux profil / usurpation",
				fields: [
					{
						name: "reseau",
						type: "select",
						options: [
							"Facebook",
							"Instagram",
							"TikTok",
							"Twitter",
							"Snapchat",
						],
						required: true,
					},
					{ name: "lien_profil", type: "url", required: true },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
		],
	},
	{
		id: "infractions_numeriques",
		label: "Infractions numériques / économiques",
		types: [
			{
				id: "fraude_contact",
				label: "Fraude par email, SMS, appel",
				fields: [
					{
						name: "type",
						type: "select",
						options: ["email", "SMS", "appel"],
						required: true,
					},
					{ name: "expediteur", type: "text", required: true },
					{ name: "contenu_suspect", type: "textarea", required: true },
					{ name: "capture", type: "file", multiple: true },
					{ name: "date", type: "date", required: true },
				],
			},
			{
				id: "usurpation",
				label: "Usurpation d’identité / faux documents",
				fields: [
					{ name: "type_document", type: "text", required: true },
					{ name: "auteur", type: "text", required: false },
					{ name: "preuve", type: "file", multiple: true },
				],
			},
			{
				id: "escroquerie_ligne",
				label: "Escroquerie en ligne",
				fields: [
					{ name: "site", type: "url", required: true },
					{ name: "montant", type: "number", required: false },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "type_arnaque", type: "text", required: true },
				],
			},
		],
	},
	{
		id: "voie_publique",
		label: "Voie publique / sécurité",
		types: [
			{
				id: "accident_danger",
				label: "Accident ou danger public immédiat",
				fields: [
					{ name: "description", type: "textarea", required: true },
					{ name: "lieu", type: "text", required: true },
					{ name: "date", type: "date", required: true },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "temoins", type: "text", required: false },
				],
			},
			{
				id: "vandalisme",
				label: "Vandalisme / dégradation urbaine",
				fields: [
					{ name: "type_acte", type: "text", required: true },
					{ name: "localisation", type: "text", required: true },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "date", type: "date", required: true },
				],
			},
		],
	},
	{
		id: "btp_urbanisme",
		label: "BTP / Urbanisme",
		types: [
			{
				id: "chantier_dangereux",
				label: "Chantier non déclaré / dangereux",
				fields: [
					{ name: "adresse", type: "text", required: true },
					{ name: "photo", type: "file", multiple: true },
					{ name: "type_infraction", type: "text", required: true },
					{ name: "date", type: "date", required: true },
				],
			},
			{
				id: "infraction_urbanistique",
				label: "Infraction urbanistique",
				fields: [
					{ name: "nature_infraction", type: "text", required: true },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "adresse", type: "text", required: true },
				],
			},
		],
	},
	{
		id: "commerce",
		label: "Commerce / Consommation",
		types: [
			{
				id: "arnaque_commerciale",
				label: "Arnaque commerciale / pratique trompeuse",
				fields: [
					{ name: "commerce_concerne", type: "text", required: true },
					{ name: "type_abus", type: "text", required: true },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "date", type: "date", required: true },
				],
			},
			{
				id: "vente_illicite",
				label: "Vente de produits interdits",
				fields: [
					{ name: "produit", type: "text", required: true },
					{ name: "lieu", type: "text", required: true },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "date", type: "date", required: true },
				],
			},
		],
	},
	{
		id: "protection_animale",
		label: "Protection animale",
		types: [
			{
				id: "cruaute_animaux",
				label: "Cruauté / actes barbares envers animaux",
				fields: [
					{ name: "type_animal", type: "text", required: true },
					{ name: "lieu", type: "text", required: true },
					{ name: "photo", type: "file", multiple: true },
					{ name: "temoin", type: "text", required: false },
				],
			},
			{
				id: "trafic_abandon",
				label: "Trafic ou abandon d’animaux",
				fields: [
					{ name: "description", type: "textarea", required: true },
					{ name: "localisation", type: "text", required: true },
					{ name: "preuve", type: "file", multiple: true },
					{ name: "date", type: "date", required: true },
				],
			},
		],
	},
];

// Génération du mapping des champs par type
const typeFieldMap = {};
rawCategories.forEach((cat) => {
	cat.types.forEach((type) => {
		typeFieldMap[type.id] = type.fields;
	});
});

export default function TypeSignalementPage() {
	const [step, setStep] = useState(0); // 0: Catégorie, 1: Type, 2: Formulaire, 3: Confirmation
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedType, setSelectedType] = useState(null);
	const [form, setForm] = useState({});
	const [files, setFiles] = useState({});
	const [selectedTypes, setSelectedTypes] = useState([]);

	// Navigation stricte : Catégorie -> Type -> Formulaire -> Confirmation
	const handleCategory = (cat) => {
		setSelectedCategory(cat);
		setSelectedType(null);
		setForm({});
		setFiles({});
		setSelectedTypes([]);
		setStep(1);
	};
	const handleType = (type) => {
		setSelectedType(type);
		setForm({});
		setFiles({});
		setStep(2);
	};
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleTypeCheckbox = (type) => {
		setSelectedTypes((prev) =>
			prev.includes(type)
				? prev.filter((t) => t !== type)
				: [...prev, type]
		);
	};
	// Gestion avancée des fichiers (multi-fichiers, preview, suppression)
	const handleFileChange = (e, fieldName) => {
		setFiles({ ...files, [fieldName]: Array.from(e.target.files) });
	};
	const handleRemoveFile = (fieldName, idx) => {
		setFiles((prev) => {
			const arr = prev[fieldName] ? [...prev[fieldName]] : [];
			arr.splice(idx, 1);
			return { ...prev, [fieldName]: arr };
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setStep(3);
	};
	const handleBack = () => {
		if (step === 3) setStep(2);
		else if (step === 2) setStep(1);
		else if (step === 1) setStep(0);
	};

	return (
		<div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
			<h1
				style={{
					textAlign: "center",
					color: "#1976d2",
					marginBottom: 32,
				}}
			>
				Formulaire de signalement
			</h1>
			{/* Étape 0 : Catégorie */}
			{step === 0 && (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: 48, // plus d'espace entre les blocs
						justifyContent: "center",
					}}
				>
					{rawCategories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => handleCategory(cat)}
							style={{
								minWidth: 320, // largeur augmentée
								minHeight: 180, // hauteur augmentée
								borderRadius: 24,
								border:
									selectedCategory?.id === cat.id
										? "4px solid #1976d2"
										: "2px solid #ccc",
								background:
									selectedCategory?.id === cat.id
										? "#e3eafc"
										: "#f8fafc",
								fontWeight: 700,
								fontSize: 28, // texte plus grand
								cursor: "pointer",
								boxShadow:
									selectedCategory?.id === cat.id
										? "0 8px 32px #1976d2"
										: "0 4px 16px #e3eafc",
								transition: "all 0.2s",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{cat.label}
						</button>
					))}
				</div>
			)}
			{/* Étape 1 : Type */}
			{step === 1 && selectedCategory && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (selectedTypes.length > 0) setStep(2);
					}}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 24,
					}}
				>
					<div
						style={{
							background: "#f8fafc",
							borderRadius: 16,
							padding: 24,
							boxShadow: "0 2px 8px #e3eafc",
							width: "100%",
							maxWidth: 500,
						}}
					>
						{selectedCategory.types.map((type) => (
							<label
								key={type.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
									fontSize: 18,
									marginBottom: 16,
									cursor: "pointer",
								}}
							>
								<input
									type="checkbox"
									checked={selectedTypes.includes(type)}
									onChange={() => handleTypeCheckbox(type)}
									style={{ width: 22, height: 22 }}
								/>
								<span>{type.label}</span>
							</label>
						))}
					</div>
					<div style={{ marginTop: 24, display: "flex", gap: 16 }}>
						<button
							type="button"
							onClick={handleBack}
							style={{
								padding: 12,
								borderRadius: 8,
								background: "#e3eafc",
								color: "#1976d2",
								fontWeight: 700,
								border: "none",
								cursor: "pointer",
							}}
						>
							Retour
						</button>
						<button
							type="submit"
							disabled={selectedTypes.length === 0}
							style={{
								padding: 12,
								borderRadius: 8,
								background:
									selectedTypes.length === 0 ? "#ccc" : "#1976d2",
								color: "#fff",
								fontWeight: 700,
								border: "none",
								cursor:
									selectedTypes.length === 0
										? "not-allowed"
										: "pointer",
							}}
						>
							Valider
						</button>
					</div>
				</form>
			)}
			{/* Étape 2 : Formulaire dynamique */}
			{step === 2 && selectedType && (
				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 20,
						marginTop: 16,
					}}
				>
					{typeFieldMap[selectedType.id].map((field) => (
						<div key={field.name}>
							<label
								style={{
									fontWeight: 600,
									display: "block",
									marginBottom: 6,
								}}
							>
								{field.label || field.name}
								{field.required && " *"}
							</label>
							{field.type === "textarea" ? (
								<textarea
									name={field.name}
									required={field.required}
									value={form[field.name] || ""}
									onChange={handleChange}
									style={{
										width: "100%",
										minHeight: 70,
										borderRadius: 8,
										border: "1px solid #ccc",
										padding: 10,
									}}
								/>
							) : field.type === "select" ? (
								<select
									name={field.name}
									required={field.required}
									value={form[field.name] || ""}
									onChange={handleChange}
									style={{
										width: "100%",
										borderRadius: 8,
										border: "1px solid #ccc",
										padding: 10,
									}}
								>
									<option value="">Sélectionner</option>
									{field.options &&
										field.options.map((opt) => (
											<option key={opt} value={opt}>
												{opt}
											</option>
										))}
								</select>
							) : field.type === "file" ? (
								<div>
									<input
										type="file"
										name={field.name}
										multiple={field.multiple}
										required={
											field.required &&
											(!files[field.name] ||
												files[field.name].length === 0)
										}
										onChange={(e) => handleFileChange(e, field.name)}
										style={{
											width: "100%",
											borderRadius: 8,
											border: "1px solid #ccc",
											padding: 10,
										}}
									/>
									{/* Preview et suppression des fichiers */}
									{files[field.name] && files[field.name].length > 0 && (
										<ul
											style={{
												listStyle: "none",
												padding: 0,
												marginTop: 8,
											}}
										>
											{files[field.name].map((file, idx) => (
												<li
													key={idx}
													style={{
														marginBottom: 4,
														display: "flex",
														alignItems: "center",
													}}
												>
													{file.type.startsWith("image/") ? (
														<img
															src={URL.createObjectURL(file)}
															alt={file.name}
															style={{
																width: 48,
																height: 48,
																objectFit: "cover",
																borderRadius: 6,
																marginRight: 8,
															}}
														/>
													) : (
														<span style={{ marginRight: 8 }}>
															{file.name}
														</span>
													)}
													<button
														type="button"
														onClick={() => handleRemoveFile(field.name, idx)}
														style={{
															background: "#f44336",
															color: "#fff",
															border: "none",
															borderRadius: 4,
															padding: "2px 8px",
															cursor: "pointer",
															fontSize: 12,
														}}
													>
														Supprimer
													</button>
												</li>
											))}
										</ul>
									)}
								</div>
							) : (
								<input
									type={field.type}
									name={field.name}
									required={field.required}
									value={form[field.name] || ""}
									onChange={handleChange}
									style={{
										width: "100%",
										borderRadius: 8,
										border: "1px solid #ccc",
										padding: 10,
									}}
								/>
							)}
						</div>
					))}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 24,
						}}
					>
						<button
							type="button"
							onClick={handleBack}
							style={{
								padding: 12,
								borderRadius: 8,
								background: "#e3eafc",
								color: "#1976d2",
								fontWeight: 700,
								border: "none",
								cursor: "pointer",
							}}
						>
							Retour
						</button>
						<button
							type="submit"
							style={{
								padding: 12,
								borderRadius: 8,
								background: "#1976d2",
								color: "#fff",
								fontWeight: 700,
								border: "none",
								cursor: "pointer",
							}}
						>
							Valider
						</button>
					</div>
				</form>
			)}
			{/* Étape 3 : Confirmation */}
			{step === 3 && selectedType && (
				<div style={{ marginTop: 24 }}>
					<h3
						style={{
							color: "#1976d2",
							fontWeight: 700,
						}}
					>
						Récapitulatif
					</h3>
					<ul
						style={{
							listStyle: "none",
							padding: 0,
						}}
					>
						{typeFieldMap[selectedType.id].map((field) => (
							<li key={field.name} style={{ marginBottom: 12 }}>
								<strong>{field.label || field.name} :</strong>{" "}
								{field.type === "file"
									? files[field.name] && files[field.name].length > 0
										? (
											<ul style={{ listStyle: "none", padding: 0 }}>
												{files[field.name].map((file, idx) => (
													<li key={idx} style={{ marginBottom: 4 }}>
														{file.type.startsWith("image/") ? (
															<img
																src={URL.createObjectURL(file)}
																alt={file.name}
																style={{
																	width: 48,
																	height: 48,
																	objectFit: "cover",
																	borderRadius: 6,
																	marginRight: 8,
																}}
															/>
														) : (
															<a
																href={URL.createObjectURL(file)}
																target="_blank"
																rel="noopener noreferrer"
															>
																{file.name}
															</a>
														)}
													</li>
												))}
											</ul>
										)
										: "Aucun fichier"
									: form[field.name] || "Non renseigné"}
							</li>
						))}
					</ul>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 24,
						}}
					>
						<button
							type="button"
							onClick={handleBack}
							style={{
								padding: 12,
								borderRadius: 8,
								background: "#e3eafc",
								color: "#1976d2",
								fontWeight: 700,
								border: "none",
								cursor: "pointer",
							}}
						>
							Retour
						</button>
						<button
							type="button"
							style={{
								padding: 12,
								borderRadius: 8,
								background: "#1976d2",
								color: "#fff",
								fontWeight: 700,
								border: "none",
								cursor: "pointer",
							}}
							onClick={() => alert("Signalement envoyé !")}
						>
							Envoyer
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
