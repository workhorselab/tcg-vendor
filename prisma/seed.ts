import "dotenv/config";
import prisma from "../app/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // ─── Users ────────────────────────────q──────────────

  const alice = await prisma.user.upsert({
    where: { email: "alice@tradeup.io" },
    update: {},
    create: {
      username: "alice_cards",
      email: "alice@tradeup.io",
      account_status: "active",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@tradeup.io" },
    update: {},
    create: {
      username: "bob_slabs",
      email: "bob@tradeup.io",
      account_status: "active",
    },
  });

  console.log(`Created users: ${alice.username}, ${bob.username}`);

  // ─── Assets (Alice) ────────────────────────────────

  const charizard = await prisma.asset.create({
    data: {
      user_id: alice.user_id,
      asset_type: "graded_card",
      notes: "Charizard VMAX - Shining Fates 074/072 - PSA 10",
      metadata: {
        card_name: "Charizard VMAX",
        set: "Shining Fates",
        number: "074/072",
        grading_company: "PSA",
        grade: 10,
        cert_number: "65432100",
      },
      asset_status: "owned",
    },
  });

  const umbreon = await prisma.asset.create({
    data: {
      user_id: alice.user_id,
      asset_type: "graded_card",
      notes: "Umbreon VMAX Alt Art - Evolving Skies 215/203 - CGC 9.5",
      metadata: {
        card_name: "Umbreon VMAX",
        set: "Evolving Skies",
        number: "215/203",
        grading_company: "CGC",
        grade: 9.5,
        cert_number: "4012345678",
      },
      asset_status: "owned",
    },
  });

  const pikachu = await prisma.asset.create({
    data: {
      user_id: alice.user_id,
      asset_type: "raw_card",
      notes: "Pikachu VMAX - Vivid Voltage 044/185",
      metadata: {
        card_name: "Pikachu VMAX",
        set: "Vivid Voltage",
        number: "044/185",
        condition: "Near Mint",
      },
      asset_status: "owned",
    },
  });

  const eeveeHeroes = await prisma.asset.create({
    data: {
      user_id: alice.user_id,
      asset_type: "sealed_product",
      notes: "Eevee Heroes Booster Box (Japanese)",
      metadata: {
        product_name: "Eevee Heroes Booster Box",
        language: "Japanese",
        set: "Eevee Heroes",
        pack_count: 30,
      },
      asset_status: "owned",
    },
  });

  const mewtwo = await prisma.asset.create({
    data: {
      user_id: alice.user_id,
      asset_type: "raw_card",
      notes: "Mewtwo GX - Shining Legends 039/073",
      metadata: {
        card_name: "Mewtwo GX",
        set: "Shining Legends",
        number: "039/073",
        condition: "Lightly Played",
      },
      asset_status: "sold",
    },
  });

  // ─── Assets (Bob) ──────────────────────────────────

  const lugia = await prisma.asset.create({
    data: {
      user_id: bob.user_id,
      asset_type: "graded_card",
      notes: "Lugia V Alt Art - Silver Tempest 186/195 - PSA 10",
      metadata: {
        card_name: "Lugia V",
        set: "Silver Tempest",
        number: "186/195",
        grading_company: "PSA",
        grade: 10,
        cert_number: "78901234",
      },
      asset_status: "owned",
    },
  });

  const rayquaza = await prisma.asset.create({
    data: {
      user_id: bob.user_id,
      asset_type: "graded_guard",
      notes: "Rayquaza VMAX Alt Art - Evolving Skies 218/203 - BGS 9.5",
      metadata: {
        card_name: "Rayquaza VMAX",
        set: "Evolving Skies",
        number: "218/203",
        grading_company: "BGS",
        grade: 9.5,
        sub_grades: { centering: 9.5, edges: 9.5, corners: 10, surface: 9 },
      },
      asset_status: "owned",
    },
  });

  const crownZenith = await prisma.asset.create({
    data: {
      user_id: bob.user_id,
      asset_type: "sealed_product",
      notes: "Crown Zenith Elite Trainer Box",
      metadata: {
        product_name: "Crown Zenith ETB",
        language: "English",
        set: "Crown Zenith",
        pack_count: 10,
      },
      asset_status: "sold",
    },
  });

  const rawMew = await prisma.asset.create({
    data: {
      user_id: bob.user_id,
      asset_type: "raw_card",
      notes: "Mew VMAX - Fusion Strike 114/264",
      metadata: {
        card_name: "Mew VMAX",
        set: "Fusion Strike",
        number: "114/264",
        condition: "Near Mint",
      },
      asset_status: "grading",
    },
  });

  console.log("Created assets for Alice and Bob");

  // ─── Transactions ──────────────────────────────────

  // Alice bought Charizard VMAX
  const txBuyCharizard = await prisma.transaction.create({
    data: {
      user_id: alice.user_id,
      transaction_type: "buy",
      total_amount: 350.0,
      transaction_fees_amount: 12.5,
      cash_in_amount: 0,
      cash_out_amount: 362.5,
      transaction_status: "completed",
      notes: "Purchased from local card show",
      transacted_at: new Date("2025-11-15"),
    },
  });

  await prisma.transactionAsset.create({
    data: {
      transaction_id: txBuyCharizard.transaction_id,
      asset_id: charizard.asset_id,
      role: "incoming",
      market_value_amount: 380.0,
      agreed_value_amount: 350.0,
      fees_amount: 12.5,
    },
  });

  // Alice sold Mewtwo GX
  const txSellMewtwo = await prisma.transaction.create({
    data: {
      user_id: alice.user_id,
      transaction_type: "sell",
      total_amount: 28.5,
      transaction_fees_amount: 3.75,
      cash_in_amount: 24.75,
      cash_out_amount: 0,
      transaction_status: "completed",
      notes: "Sold on TCGPlayer",
      transacted_at: new Date("2026-01-20"),
    },
  });

  await prisma.transactionAsset.create({
    data: {
      transaction_id: txSellMewtwo.transaction_id,
      asset_id: mewtwo.asset_id,
      role: "outgoing",
      market_value_amount: 30.0,
      agreed_value_amount: 28.5,
      fees_amount: 3.75,
    },
  });

  // Alice bought Umbreon + Pikachu in one transaction
  const txBuyBundle = await prisma.transaction.create({
    data: {
      user_id: alice.user_id,
      transaction_type: "buy",
      total_amount: 385.0,
      transaction_fees_amount: 0,
      cash_in_amount: 0,
      cash_out_amount: 385.0,
      transaction_status: "completed",
      notes: "Bundle deal from Discord seller",
      transacted_at: new Date("2025-12-03"),
    },
  });

  await prisma.transactionAsset.createMany({
    data: [
      {
        transaction_id: txBuyBundle.transaction_id,
        asset_id: umbreon.asset_id,
        role: "incoming",
        market_value_amount: 340.0,
        agreed_value_amount: 340.0,
        fees_amount: 0,
      },
      {
        transaction_id: txBuyBundle.transaction_id,
        asset_id: pikachu.asset_id,
        role: "incoming",
        market_value_amount: 50.0,
        agreed_value_amount: 45.0,
        fees_amount: 0,
      },
    ],
  });

  // Bob bought Lugia
  const txBuyLugia = await prisma.transaction.create({
    data: {
      user_id: bob.user_id,
      transaction_type: "buy",
      total_amount: 210.0,
      transaction_fees_amount: 5.0,
      cash_in_amount: 0,
      cash_out_amount: 215.0,
      transaction_status: "completed",
      notes: "eBay purchase",
      transacted_at: new Date("2025-10-28"),
    },
  });

  await prisma.transactionAsset.create({
    data: {
      transaction_id: txBuyLugia.transaction_id,
      asset_id: lugia.asset_id,
      role: "incoming",
      market_value_amount: 220.0,
      agreed_value_amount: 210.0,
      fees_amount: 5.0,
    },
  });

  // Bob sold Crown Zenith ETB
  const txSellETB = await prisma.transaction.create({
    data: {
      user_id: bob.user_id,
      transaction_type: "sell",
      total_amount: 65.0,
      transaction_fees_amount: 8.5,
      cash_in_amount: 56.5,
      cash_out_amount: 0,
      transaction_status: "completed",
      notes: "Sold at local game store",
      transacted_at: new Date("2026-02-10"),
    },
  });

  await prisma.transactionAsset.create({
    data: {
      transaction_id: txSellETB.transaction_id,
      asset_id: crownZenith.asset_id,
      role: "outgoing",
      market_value_amount: 60.0,
      agreed_value_amount: 65.0,
      fees_amount: 8.5,
    },
  });

  // Bob submitted Mew for grading
  const txGradeSubmit = await prisma.transaction.create({
    data: {
      user_id: bob.user_id,
      transaction_type: "grade_submission",
      total_amount: 0,
      transaction_fees_amount: 30.0,
      cash_in_amount: 0,
      cash_out_amount: 30.0,
      transaction_status: "pending",
      notes: "PSA Regular submission - 60 business day tier",
      transacted_at: new Date("2026-02-18"),
    },
  });

  await prisma.transactionAsset.create({
    data: {
      transaction_id: txGradeSubmit.transaction_id,
      asset_id: rawMew.asset_id,
      role: "outgoing",
      market_value_amount: 18.0,
      agreed_value_amount: 18.0,
      fees_amount: 30.0,
    },
  });

  // Trade: Bob traded Rayquaza for Alice's Eevee Heroes box (pending)
  const txTrade = await prisma.transaction.create({
    data: {
      user_id: bob.user_id,
      transaction_type: "trade",
      total_amount: 0,
      transaction_fees_amount: 0,
      cash_in_amount: 0,
      cash_out_amount: 0,
      transaction_status: "pending",
      notes: "Trade with Alice - Rayquaza for Eevee Heroes box",
      transacted_at: new Date("2026-02-22"),
    },
  });

  await prisma.transactionAsset.createMany({
    data: [
      {
        transaction_id: txTrade.transaction_id,
        asset_id: rayquaza.asset_id,
        role: "outgoing",
        market_value_amount: 275.0,
        agreed_value_amount: 270.0,
        fees_amount: 0,
      },
      {
        transaction_id: txTrade.transaction_id,
        asset_id: eeveeHeroes.asset_id,
        role: "incoming",
        market_value_amount: 260.0,
        agreed_value_amount: 270.0,
        fees_amount: 0,
      },
    ],
  });

  console.log("Created transactions with transaction_assets");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
