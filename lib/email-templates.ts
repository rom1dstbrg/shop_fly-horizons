interface OrderItem {
  title: string;
  quantity: number;
  unit_price: number;
}

interface ShippingAddress {
  full_name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

interface OrderConfirmationProps {
  orderRef: string;
  customerEmail: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  couponCode?: string | null;
  shippingAddress?: ShippingAddress;
}

function fmt(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function orderConfirmationEmail(props: OrderConfirmationProps): string {
  const {
    orderRef,
    customerEmail,
    customerName,
    items,
    subtotal,
    shippingCost,
    discountAmount,
    total,
    couponCode,
    shippingAddress,
  } = props;

  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:11px 0;border-bottom:1px solid #e0e5ef;color:#1e2535;font-size:14px;">
          ${item.title}
        </td>
        <td style="padding:11px 0;border-bottom:1px solid #e0e5ef;color:#64748b;font-size:14px;text-align:center;">
          x${item.quantity}
        </td>
        <td style="padding:11px 0;border-bottom:1px solid #e0e5ef;color:#1e2535;font-size:14px;text-align:right;font-weight:600;">
          ${fmt(item.unit_price * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const addressBlock = shippingAddress?.city
    ? `
    <div style="margin-top:24px;background:#f6f8fc;border:1px solid #e0e5ef;border-radius:10px;padding:16px;">
      <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px 0;">
        Adresse de livraison
      </p>
      ${shippingAddress.full_name ? `<p style="color:#1e2535;font-size:13px;margin:3px 0;font-weight:600;">${shippingAddress.full_name}</p>` : ""}
      <p style="color:#64748b;font-size:13px;margin:3px 0;">${shippingAddress.line1}</p>
      ${shippingAddress.line2 ? `<p style="color:#64748b;font-size:13px;margin:3px 0;">${shippingAddress.line2}</p>` : ""}
      <p style="color:#64748b;font-size:13px;margin:3px 0;">${shippingAddress.postal_code} ${shippingAddress.city}</p>
      <p style="color:#64748b;font-size:13px;margin:3px 0;">${shippingAddress.country}</p>
    </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Confirmation de commande - Fly Horizons Shop</title>
</head>
<body style="margin:0;padding:0;background:#f6f8fc;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fc;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header navy -->
        <tr>
          <td style="background:#0b2238;border-radius:10px 10px 0 0;padding:22px 32px;text-align:center;">
            <img
              src="https://fly-horizons.com/media/image/logo_mail.png"
              alt="Fly Horizons Shop"
              style="height:40px;width:auto;display:block;margin:0 auto;"
            />
          </td>
        </tr>

        <!-- Card blanc -->
        <tr>
          <td style="background:#ffffff;border:1px solid #e0e5ef;border-top:0;border-radius:0 0 10px 10px;padding:36px 32px;">

            <!-- Icone + titre -->
            <div style="text-align:center;margin-bottom:28px;">
              <div style="width:52px;height:52px;background:rgba(242,183,5,.12);border:1.5px solid rgba(242,183,5,.4);border-radius:50%;margin:0 auto 14px;line-height:52px;text-align:center;">
                <span style="color:#F2B705;font-size:22px;font-weight:700;">&#10003;</span>
              </div>
              <h2 style="margin:0;color:#1e2535;font-size:20px;font-weight:700;font-family:'Segoe UI',Arial,sans-serif;">
                Commande confirmee !
              </h2>
              <p style="margin:6px 0 0;color:#64748b;font-size:13px;">
                Merci pour votre commande !
              </p>
            </div>

            <!-- Reference -->
            <div style="background:#f6f8fc;border:1px solid #e0e5ef;border-radius:10px;padding:14px;margin-bottom:28px;text-align:center;">
              <p style="margin:0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">
                Reference commande
              </p>
              <p style="margin:6px 0 0;color:#F2B705;font-size:16px;font-weight:700;font-family:monospace;letter-spacing:0.05em;">
                #${orderRef}
              </p>
            </div>

            <!-- Articles -->
            <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">
              Detail de la commande
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <th style="text-align:left;color:#64748b;font-size:11px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid #e0e5ef;font-weight:600;">Produit</th>
                <th style="text-align:center;color:#64748b;font-size:11px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid #e0e5ef;font-weight:600;">Qte</th>
                <th style="text-align:right;color:#64748b;font-size:11px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid #e0e5ef;font-weight:600;">Prix</th>
              </tr>
              ${itemsRows}
            </table>

            <!-- Totaux -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
              <tr>
                <td style="color:#64748b;font-size:13px;padding:4px 0;">Sous-total</td>
                <td style="color:#1e2535;font-size:13px;text-align:right;padding:4px 0;">${fmt(subtotal)}</td>
              </tr>
              <tr>
                <td style="color:#64748b;font-size:13px;padding:4px 0;">Livraison</td>
                <td style="color:#1e2535;font-size:13px;text-align:right;padding:4px 0;">${shippingCost === 0 ? "Offerte" : fmt(shippingCost)}</td>
              </tr>
              ${discountAmount > 0 ? `
              <tr>
                <td style="color:#64748b;font-size:13px;padding:4px 0;">
                  Remise${couponCode ? ` (${couponCode})` : ""}
                </td>
                <td style="color:#16a34a;font-size:13px;text-align:right;padding:4px 0;">-${fmt(discountAmount)}</td>
              </tr>` : ""}
              <tr>
                <td style="color:#113356;font-size:15px;font-weight:700;padding:14px 0 0;border-top:1px solid #e0e5ef;">Total</td>
                <td style="color:#F2B705;font-size:15px;font-weight:700;text-align:right;padding:14px 0 0;border-top:1px solid #e0e5ef;">${fmt(total)}</td>
              </tr>
            </table>

            ${addressBlock}

            <!-- CTA -->
            <div style="text-align:center;margin-top:32px;">
              <a
                href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://shop.fly-horizons.com"}/orders"
                style="display:inline-block;background:#F2B705;color:#113356;font-size:14px;font-weight:700;padding:13px 30px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;"
              >
                Voir mes commandes
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="text-align:center;padding-top:24px;padding-bottom:8px;">
            <p style="color:#64748b;font-size:12px;margin:0;">
              Fly Horizons Shop &mdash; shop.fly-horizons.com
            </p>
            <p style="color:#94a3b8;font-size:11px;margin:4px 0 0;">
              Une question ? Repondez directement a cet email.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
