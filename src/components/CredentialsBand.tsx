const items = [
  "Instituto Van Nghi Portugal",
  "Cédula ACSS",
  "Quatro anos no Departamento de Microbioma da Regenerus Labs",
  "Longevity Med Summit 2024",
  "20 anos de prática clínica",
];

const CredentialsBand = () => {
  return (
    <section className="bg-muted py-5 px-6">
      <p className="label-uppercase text-muted-foreground text-[13px] text-center max-w-5xl mx-auto leading-relaxed">
        {items.map((item, i) => (
          <span key={i} className="whitespace-nowrap inline-block">
            {item}
            {i < items.length - 1 && <span className="mx-3 text-amber">·</span>}
          </span>
        ))}
      </p>
    </section>
  );
};

export default CredentialsBand;
