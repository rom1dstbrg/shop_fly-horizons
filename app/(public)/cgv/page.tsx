import type { Metadata } from "next";
import { CgvAccordion } from "@/components/shop/CgvAccordion";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente de la boutique Fly Horizons Shop.",
};

const CGV_SECTIONS = [
  {
    title: "1. Objet et champ d'application",
    content: `Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes conclues entre Fly Horizons Shop (ci-après « le Vendeur ») et tout acheteur non professionnel (ci-après « le Client ») effectuant un achat sur le site fly-horizons.com/shop.

Toute commande passée sur le site implique l'acceptation pleine et entière des présentes CGV. Le Vendeur se réserve le droit de modifier à tout moment les présentes CGV ; les conditions applicables sont celles en vigueur au moment de la passation de la commande.`,
  },
  {
    title: "2. Produits et disponibilité",
    content: `Les produits proposés à la vente sont ceux figurant sur le site au moment de la consultation par le Client. Chaque produit est accompagné d'un descriptif établi par le Vendeur.

Les photographies et visuels des produits n'ont pas de valeur contractuelle. Le Vendeur s'efforce de présenter les produits avec la plus grande fidélité possible.

La disponibilité des produits est indiquée sur chaque fiche produit. En cas d'indisponibilité d'un produit après passation de la commande, le Client en sera informé par e-mail dans les meilleurs délais et pourra obtenir le remboursement intégral des sommes versées.`,
  },
  {
    title: "3. Prix",
    content: `Les prix des produits sont indiqués en euros (€), toutes taxes comprises (TTC). Les frais de livraison sont indiqués séparément lors de la finalisation de la commande.

Le Vendeur se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.`,
  },
  {
    title: "4. Commandes",
    content: `Le Client sélectionne les produits souhaités et les ajoute à son panier. Après vérification de la commande et acceptation des CGV, le Client procède au paiement.

La vente est conclue à la date de confirmation de paiement envoyée par e-mail. Le Vendeur se réserve le droit d'annuler ou de refuser toute commande d'un Client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.

Toute commande passée sur le site constitue la formation d'un contrat conclu à distance entre le Client et le Vendeur.`,
  },
  {
    title: "5. Paiement",
    content: `Le règlement des achats s'effectue en ligne par carte bancaire via la plateforme sécurisée Stripe. Les données bancaires transmises sont cryptées et ne sont jamais stockées sur les serveurs du Vendeur.

Le paiement est exigible immédiatement à la commande. La commande est validée dès réception de la confirmation de paiement par Stripe.`,
  },
  {
    title: "6. Livraison",
    content: `Les produits sont livrés à l'adresse de livraison indiquée par le Client lors de la commande. Les livraisons sont effectuées en Belgique, en France, aux Pays-Bas et en Allemagne.

Les délais de livraison sont donnés à titre indicatif. Un retard de livraison ne pourra pas donner lieu à des dommages et intérêts au bénéfice du Client, ni à l'annulation de la commande, sauf cas de force majeure.

En cas de livraison incomplète ou endommagée, le Client devra formuler toutes réserves auprès du transporteur dans les délais légaux.`,
  },
  {
    title: "7. Droit de rétractation",
    content: `Conformément à la législation en vigueur, le Client dispose d'un délai de 14 jours calendaires à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.

Pour exercer ce droit, le Client doit notifier sa décision de rétractation par e-mail à l'adresse info@fly-horizons.com, en précisant son numéro de commande.

Les produits doivent être retournés dans leur état d'origine, complets et non utilisés. Les frais de retour sont à la charge du Client. Le remboursement sera effectué dans un délai de 14 jours suivant la réception des produits retournés.`,
  },
  {
    title: "8. Garanties",
    content: `Tous les produits vendus bénéficient de la garantie légale de conformité (article L217-4 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).

En cas de non-conformité d'un produit, le Client peut choisir entre le remplacement ou le remboursement du produit, sous réserve des conditions légales en vigueur.`,
  },
  {
    title: "9. Responsabilité",
    content: `Le Vendeur ne pourra être tenu pour responsable de l'inexécution du contrat en cas de force majeure, de perturbation ou grève totale ou partielle des services postaux et moyens de transport et/ou de communications, d'inondation ou d'incendie.

Le Vendeur ne saurait être tenu responsable pour tous les inconvénients ou dommages inhérents à l'utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.`,
  },
  {
    title: "10. Protection des données personnelles",
    content: `Les données personnelles collectées lors de la passation d'une commande sont nécessaires au traitement et à la livraison de celle-ci. Elles sont destinées exclusivement au Vendeur et ne seront jamais cédées à des tiers.

Conformément au Règlement Général sur la Protection des Données (RGPD), le Client dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en envoyant un e-mail à info@fly-horizons.com.`,
  },
  {
    title: "11. Litiges et droit applicable",
    content: `Les présentes CGV sont soumises au droit belge. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents de Belgique seront seuls compétents.

Le Client peut également recourir à la plateforme européenne de résolution des litiges en ligne disponible à l'adresse : https://ec.europa.eu/consumers/odr`,
  },
];

export default function CgvPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container-shop max-w-3xl">

        {/* En-tête */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Légal
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Conditions Générales de Vente
          </h1>

          {/* Métadonnées */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-card border border-border rounded-2xl">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Version</p>
              <p className="text-sm font-semibold text-foreground">1.0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Société</p>
              <p className="text-sm font-semibold text-foreground">Fly Horizons</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Publication</p>
              <p className="text-sm font-semibold text-foreground">14 mai 2025</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Application</p>
              <p className="text-sm font-semibold text-foreground">14 mai 2025</p>
            </div>
          </div>
        </div>

        {/* Accordéon */}
        <CgvAccordion sections={CGV_SECTIONS} />

      </div>
    </main>
  );
}
