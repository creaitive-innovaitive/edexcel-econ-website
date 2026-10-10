"""Adds the Real world tab to a kit body: python3 realworld.py (idempotent). Cases are described in general terms; check current figures before quoting."""
import pathlib
D = pathlib.Path(__file__).parent
NOTE = "Descriptions are kept general and based on widely reported events. Check current figures before quoting numbers in an exam."
CASES = {
"t31": [
 ("Banking bonuses and the 2008 crisis", "Before 2008, many bank managers were paid bonuses linked to short-term profit and trading volumes. Critics argued this encouraged risk-taking whose costs later fell on shareholders and taxpayers. Since then, bonuses have often been deferred and can be reclaimed (clawback).", "A clear principal-agent example: managers (agents) pursued pay linked to short-term profit, shareholders (principals) bore the risk. Solutions: long-term incentives, deferral, clawback."),
 ("Disney and 21st Century Fox", "In 2019 Disney completed the purchase of most of 21st Century Fox's film and television businesses, in a deal reported at around $71 billion. Both firms produced and owned entertainment content. Regulators approved it, in some places with conditions such as selling certain assets.", "Horizontal integration: same stage, same industry. Link to economies of scale, market power over distributors, and regulatory conditions."),
 ("Microsoft and Activision", "Microsoft's purchase of the video-game publisher Activision Blizzard was announced in 2022 at around $69 billion. The UK competition authority first blocked it in 2023, then cleared a restructured deal after Microsoft agreed to sell certain cloud-gaming rights. The deal completed in late 2023.", "Regulation as a constraint on growth, and benefits of mergers (access to games, scale). Compare with the 2025 Paper 1 question on Microsoft."),
 ("Meta and Giphy", "Meta (then Facebook) bought the animated-image library Giphy in 2020. The UK competition authority concluded the deal could reduce competition and ordered Meta to sell it. Giphy was later sold to another company.", "A merger that harms competition can be unwound. Useful evaluation point on regulation and on mergers bought to remove potential rivals."),
 ("Demergers: GSK and Unilever", "GSK split off its consumer health business as a separate company, Haleon, in 2022. Unilever announced in 2024 that it would separate its ice cream business, with the new company listed separately by the end of 2025.", "Reasons for demergers: refocus on the core business, the parts worth more apart, different growth and investment needs."),
 ("Organic growth: a high street baker", "Some food retailers have grown mainly by opening more shops funded from their own profits, rather than by buying rivals. This is slower than a takeover but keeps control and avoids merger integration costs.", "Organic versus external growth: lower risk and less debt, but slower and limited by retained profit and the size of the market."),
],
"t34a": [
 ("Wheat and other commodity farming", "Many farmers sell near-identical wheat on global markets at a price they cannot influence. Individual farmers are price takers, and high prices tend to attract extra planting.", "Closest real-world example of perfect competition: homogeneous product, many sellers, price set by the market. Weaknesses: markets are not perfect (subsidies, information gaps)."),
 ("Independent coffee shops and barbers", "High streets contain many small cafes and barbers with differentiated products (style, atmosphere, location) and low barriers to entry. Profits for a successful shop tend to attract imitators, and weaker shops close.", "Monopolistic competition: differentiation gives some price-setting power, entry removes supernormal profit, so long-run normal profit."),
 ("Restaurant entry and exit", "New restaurants open and close frequently, and many do not last more than a few years. Easy entry and exit and brand differentiation fit monopolistic competition.", "Evidence for low barriers and for profits being competed away. Evaluate: very high rents may limit entry in city centres."),
 ("UK craft breweries", "The number of UK breweries more than doubled in the 2010s as small producers entered a market with growing demand for differentiated craft beer. Rising costs and a shake-out later forced some to close.", "Entry attracted by supernormal profit, differentiation through brand and quality, and long-run adjustment towards normal profit."),
],
"t34b": [
 ("UK supermarkets", "A handful of large grocers have held roughly two-thirds of the UK grocery market, with discounters such as Aldi and Lidl growing their share. Rivals frequently match each other's prices on staples and run price-match promotions.", "Concentration ratio, interdependence and non-collusive price matching. The rise of the discounters shows how entry can erode an oligopoly."),
 ("OPEC and oil quotas", "OPEC members, joined by other producers in OPEC+, agree output targets to support the oil price. Members have often produced above their quotas, and the rise of US shale oil has weakened the group's influence.", "A cartel in practice: the gains from collusion, the incentive to cheat and why such agreements are unstable."),
 ("The European truck cartel", "Several European truck makers were found to have coordinated prices over many years, including passing on the costs of meeting emissions rules. The European Commission imposed fines of billions of euros in 2016 and 2017.", "Overt collusion, illegal in the UK and EU, and why firms collude (joint profit, shared cost shocks)."),
 ("Apple and Samsung", "Smartphone makers compete heavily on branding, design, camera quality and software ecosystems rather than mainly on price. Both firms have spent large sums on product development and advertising.", "Non-price competition in an oligopoly, differentiation and barriers to entry. Evaluate: R&D can be a benefit (dynamic efficiency) and a cost passed on in prices."),
],
"t34c": [
 ("EpiPen pricing", "In the 2010s the price of the EpiPen emergency allergy injector in the United States rose sharply, to several hundred dollars for a pack, with few close substitutes available. Public criticism and the launch of alternatives followed.", "Market power with inelastic demand: a price maker raising price. Link to barriers (regulation, patents) and to government response."),
 ("Rail fares: peak and off-peak", "Train operators charge higher fares at peak times and lower fares off peak, with discounted railcards for groups such as students and older travellers.", "Third-degree price discrimination: separate groups, different elasticities, same service. Discuss benefits to the firm and some consumers, and costs to commuters."),
 ("Natural monopolies: water pipes and the power grid", "In Britain, water supply networks and the electricity transmission grid are natural monopolies because duplicating the networks would be wasteful. They are regulated by bodies such as Ofwat and Ofgem.", "Natural monopoly and the case for regulation (links to 3.6)."),
 ("Google and search", "Google has held a very large share of internet search in many countries. European authorities have fined it billions of euros over competition issues, and in 2024 a US court found that it had unlawfully maintained a search monopoly.", "Barriers to entry such as data and network effects, and the role of competition policy. Use it as an example of a firm with a dominant position."),
],
"t34d": [
 ("Supermarkets and suppliers", "Large grocers buy from many small farmers and manufacturers. Complaints about unfair terms and late payment led to the UK Groceries Code in 2009 and the Groceries Code Adjudicator in 2013.", "A real policy response to buyer power: restrictions on monopsony power (3.6.1d)."),
 ("NHS nurses", "The NHS is by far the biggest employer of nurses in the UK, and pay is set through a pay review process. Some economists argue this gives the NHS monopsony power over nurses' pay, a point used in a recent Paper 1 question.", "Monopsony in the labour market: lower wages and employment than in competition, with evaluation points about training time and public spending limits."),
 ("Amazon and publishers", "Publishers have complained that large retailers such as Amazon use their size to push for lower prices or better terms, and that those who refuse can see their books made less visible. The issue appeared in a past exam essay on monopsony.", "Monopsony applies to firms as buyers. Say what is being bought, from whom, and what suppliers can do (few alternatives)."),
 ("Mobile network spectrum auctions", "When the UK auctioned 3G mobile licences in 2000, bidders paid around £22 billion in total. Such large, unrecoverable payments, plus the cost of building networks, make entry very risky.", "Sunk costs and barriers to entry: a high sunk cost makes a market less contestable."),
 ("Budget airlines and ride-hailing", "Low-cost airlines can move planes between routes, and ride-hailing apps can recruit drivers who use their own cars. In both cases entry and exit are comparatively easy, though licences and airport slots can act as barriers.", "Contestability: low sunk costs and hit-and-run entry. Evaluate with regulation and scarce airport slots."),
],
"t35": [
 ("HGV driver shortages", "In 2021 the UK reported a shortage of tens of thousands of heavy-goods-vehicle drivers, with some firms offering bonuses and higher pay.", "Labour demand outpacing supply: a rise in wage and use of non-wage incentives. Link to occupational immobility (training and licensing take time)."),
 ("The National Living Wage", "The UK introduced a national minimum wage in 1999, advised by the Low Pay Commission. The adult rate has risen far faster than inflation in recent years (about £11.44 an hour in April 2024 and £12.21 from April 2025 for those aged 21 and over).", "Minimum wage evidence: studies have generally found small job losses, which supports monopsony and productivity arguments. Quote a current rate only if you are sure of it."),
 ("House prices and regional gaps", "Average house prices in London are typically several times those in the North East of England. High housing costs make it hard for workers in lower-cost regions to move to better-paid jobs.", "Geographical immobility: cause and effect, and policy options such as affordable housing and relocation help."),
 ("Automation and self-service tills", "Supermarkets have installed self-service tills, reducing the number of cashiers needed. Firms may use fewer workers where capital becomes cheaper or more productive, while demand grows for technicians and delivery staff.", "Substitution of capital for labour and its effect on labour demand. Link to occupational immobility and retraining."),
 ("NHS strikes and public sector pay", "Nurses and junior doctors in England took strike action in 2022 to 2024 over pay and conditions. Public sector pay is set with the help of pay review bodies, and wage rises are limited by government budgets.", "Public sector wage setting and its limits: staff shortages, recruitment and retention problems, and the cost to taxpayers."),
 ("Gender pay gap reporting", "Since 2017, UK employers with 250 or more staff have had to publish their gender pay gaps. Reasons given include occupational choices, career breaks and discrimination.", "Wage differentials and labour market imperfections: use it for evaluation questions on why pay differs between workers."),
],
"t36": [
 ("Blocking a supermarket merger", "In 2019 the UK competition authority blocked the proposed merger of Sainsbury's and Asda, concluding that it could reduce competition and raise prices for shoppers.", "Merger control in action. Benefits (protects competition) versus drawbacks (the firms argued for lower prices through scale)."),
 ("Regulating water", "Ofwat sets five-year price limits for water companies. Financial strain and sewage discharge failures at some companies, notably Thames Water, have led to calls for tougher regulation.", "Price regulation of a natural monopoly and its limits: debt, under-investment and asymmetric information."),
 ("The energy price cap", "Since 2019 Ofgem has capped what suppliers can charge households on default tariffs, adjusting it regularly. The cap rose sharply in 2022 as wholesale gas prices jumped, and the government added further support.", "Price regulation: the aim of protecting consumers, the risk to supplier finances, and why caps follow costs. Links to a recent Paper 1 essay."),
 ("Railway ownership", "British Rail was privatised in the 1990s, and the track was later put under Network Rail. Since 2018 several train operators have returned to public ownership, and more have followed.", "Privatisation and nationalisation: efficiency and investment versus social aims and cost to taxpayers."),
 ("Carillion and public contracts", "Carillion, a major government contractor, collapsed in 2018. Critics argued competitive tendering and low bids had left the firm financially fragile and exposed public services.", "A drawback of competitive tendering: low bids and cost cutting can risk quality and failure."),
 ("Regulatory capture and aviation", "After two Boeing 737 MAX crashes in 2018 and 2019, critics argued that the US safety regulator relied too heavily on the manufacturer to certify its own work.", "Regulatory capture and asymmetric information: the regulator depends on the firm it regulates."),
],
}

def block(items):
    h = '<section id="real" role="tabpanel" hidden>\n  <p class="note">' + NOTE + '</p>\n'
    for t, p, u in items:
        h += f'  <div class="rw"><h3>{t}</h3><p>{p}</p><div class="use"><b>Exam use:</b> {u}</div></div>\n'
    return h + '</section>\n\n'

for name, items in CASES.items():
    f = D / f"{name}.body.html"; s = f.read_text()
    if 'data-p="real"' in s:
        a = s.index('<section id="real"'); b = s.index('<!-- EXAM -->')
        s = s[:a] + block(items) + s[b:]
    else:
        s = s.replace('  <button role="tab" data-p="practise">Practise</button>\n', '  <button role="tab" data-p="practise">Practise</button>\n  <button role="tab" data-p="real">Real world</button>\n')
        s = s.replace('<!-- EXAM -->', '<!-- REAL WORLD -->\n' + block(items) + '<!-- EXAM -->')
    f.write_text(s)
    print(name, len(items))
