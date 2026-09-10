# Supply chain × emerging tech — node map and research ledger

Domain: the supply chain and logistics industry. Lens: emerging technology,
with physical AI as the largest but not the only branch.

Nodes are the unit of work. You pick one, we research it together, the result
gets written to gbrain under that node's slug, and this ledger records status.
The map is finished when every node is `researched`, `parked` or `killed` —
not when you feel done.

---

## Status vocabulary

| status | meaning |
|---|---|
| `untouched` | no work yet |
| `scoped` | we agreed what the question is, not yet answered |
| `researched` | full node record written to gbrain |
| `parked` | real but not now — reason recorded |
| `killed` | closed by evidence — the kill test came back negative |

Tags: `EDGE` fits the statistical-certification edge · `DATE` has a dated
forcing function · `CROWD` already contested

---

## Node index

| ID | node | cluster | tags | status | gbrain slug |
|---|---|---|---|---|---|
| W1 | humanoids in DCs | four walls | | untouched | `research/sc-map/w1-humanoids-dc` |
| W2 | piece-picking policies | four walls | | untouched | `research/sc-map/w2-piece-picking` |
| W3 | AMR fleet orchestration | four walls | | untouched | `research/sc-map/w3-amr-fleet` |
| W4 | RaaS acceptance testing | four walls | EDGE | untouched | `research/sc-map/w4-raas-acceptance` |
| W5 | twin-based commissioning | four walls | EDGE | untouched | `research/sc-map/w5-twin-commissioning` |
| W6 | exoskeletons | four walls | | untouched | `research/sc-map/w6-exoskeletons` |
| Y1 | autonomous yard tractors | yard and dock | | untouched | `research/sc-map/y1-yard-tractors` |
| Y2 | trailer loading automation | yard and dock | | untouched | `research/sc-map/y2-trailer-loading` |
| Y3 | dock orchestration | yard and dock | | untouched | `research/sc-map/y3-dock-orchestration` |
| Y4 | gate and asset ID | yard and dock | | untouched | `research/sc-map/y4-gate-asset-id` |
| L1 | driver-out trucking | line-haul | | untouched | `research/sc-map/l1-driver-out` |
| L2 | safety-case validation | line-haul | EDGE | untouched | `research/sc-map/l2-safety-case` |
| L3 | autonomy underwriting | line-haul | EDGE | untouched | `research/sc-map/l3-autonomy-underwriting` |
| L4 | electrification and TCO | line-haul | | untouched | `research/sc-map/l4-electrification-tco` |
| L5 | driver capacity exit | line-haul | DATE | untouched | `research/sc-map/l5-driver-capacity` |
| P1 | terminal and crane autonomy | ports and rail | | untouched | `research/sc-map/p1-terminal-autonomy` |
| P2 | container visibility | ports and rail | | untouched | `research/sc-map/p2-container-visibility` |
| P3 | rail inspection autonomy | ports and rail | | untouched | `research/sc-map/p3-rail-inspection` |
| P4 | trade compliance | ports and rail | DATE | untouched | `research/sc-map/p4-trade-compliance` |
| D1 | delivery robots | last mile | | untouched | `research/sc-map/d1-delivery-robots` |
| D2 | drone BVLOS | last mile | DATE | untouched | `research/sc-map/d2-drone-bvlos` |
| D3 | locker networks | last mile | | untouched | `research/sc-map/d3-locker-networks` |
| T1 | carrier identity fraud | trust layer | DATE | untouched | `research/sc-map/t1-carrier-identity` |
| T2 | pricing agents | trust layer | CROWD | untouched | `research/sc-map/t2-pricing-agents` |
| T3 | digital freight documents | trust layer | | untouched | `research/sc-map/t3-freight-documents` |
| T4 | payments and factoring | trust layer | | untouched | `research/sc-map/t4-payments-factoring` |
| N1 | inventory foundation models | planning | | untouched | `research/sc-map/n1-inventory-fm` |
| N2 | network design | planning | | untouched | `research/sc-map/n2-network-design` |
| N3 | network digital twins | planning | | untouched | `research/sc-map/n3-network-twins` |
| N4 | agent orchestration | planning | CROWD | untouched | `research/sc-map/n4-agent-orchestration` |
| C1 | learned-policy conformity | assurance | EDGE DATE | untouched | `research/sc-map/c1-policy-conformity` |
| C2 | Scope 3 assurance | assurance | EDGE DATE | untouched | `research/sc-map/c2-scope3-assurance` |
| C3 | cold chain track-trace | assurance | DATE | untouched | `research/sc-map/c3-cold-chain` |
| C4 | robot safety standards | assurance | EDGE DATE | untouched | `research/sc-map/c4-robot-safety-standards` |
| E1 | policy licensing economics | infrastructure | | untouched | `research/sc-map/e1-policy-licensing` |
| E2 | teleop and data rigs | infrastructure | | untouched | `research/sc-map/e2-teleop-rigs` |
| E3 | twin platforms | infrastructure | CROWD | untouched | `research/sc-map/e3-twin-platforms` |
| E4 | in-facility edge compute | infrastructure | | untouched | `research/sc-map/e4-edge-compute` |

---

## Per-node record — the fixed template

Every researched node produces exactly these nine fields. Same shape every
time, so nodes stay comparable and the ledger can be ranked rather than reread.

1. **The opening** — what the gap is, in two sentences.
2. **What changed** — the specific recent event that opened it, with a date.
   If nothing changed, this node is not an opening.
3. **Who is already here** — named companies, funding, stage, and what exactly
   each one sells.
4. **The buyer** — who pays, what they currently spend badly on, and roughly
   how much.
5. **Forcing function** — the rule, contract or deadline that compels action,
   and its date. `none` is a valid and important answer.
6. **Why it is still open** — the specific technical or structural reason
   incumbents have not closed it. Vague answers here mean the node is not
   really open.
7. **Verdict against the edge** — `fit` / `adjacent` / `no fit`, with the
   reason. The edge is statistical certification of learned-system performance.
8. **Score** — five axes, 1 to 5 each:
   forcing function · buyer pays today · edge fit · uncrowdedness · technical depth
9. **Kill test** — the single question whose answer would close this node, and
   the named document or category of person who can answer it.

---

## The working loop

1. You pick a node (or click one on the map).
2. I research it and produce the nine fields, with sources and dates.
3. I write it to gbrain at that node's slug and update this ledger's status.
4. Every fifth node, I re-rank the whole ledger by score and report what moved.

Stop condition: when two consecutive re-ranks produce the same top three,
desk research has saturated. That is the signal to stop reading and go get
primary evidence from people in those three seats.

---

## Recommended order

Not alphabetical — ordered so that early nodes inform later ones.

- **First three:** C1, W4, L3. These are the assurance seam, and they share a
  buyer logic. If all three come back weak, the certification thesis is dead
  and you have saved yourself a year.
- **Next two, as controls:** T1 and N1. Both are large and obvious openings
  with no relationship to the edge. They exist to test whether the edge is
  actually the best thing you have, or just the thing you looked at first.
- **Then:** E1 and E3, which tell you how fast the layer beneath you is
  commoditizing, and therefore how much time the thesis has.
