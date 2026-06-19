/** @typedef {string | string[]} FaqBlock */

/**
 * @param {FaqBlock[]} blocks
 * @returns {string}
 */
export function faqAnswerText(blocks) {
  return blocks
    .flatMap((block) => (Array.isArray(block) ? block : [block]))
    .join(' ');
}

export const FAQ_ITEMS = [
  {
    question: 'How does the AI decide when to reallocate coverage?',
    answer: [
      'It reads merchant category codes and card authorisation data in real time - for example, an airline code triggers increased travel coverage instantly, without customer input.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What happens if the AI makes the wrong call?',
    answer: [
      'Every reallocation operates within floor-and-ceiling guardrails, guaranteeing minimum coverage in every category regardless of AI decisions. Phase 1 also uses manual oversight before full autonomy kicks in.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How is this different from on-demand insurance products already on the market?',
    answer: [
      'Most on-demand products require manual activation. Ours is fully automatic, triggered by actual spending behaviour - the customer never needs to think about it.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you handle cross-border regulatory differences between Hong Kong, Shenzhen, and Macau?',
    answer: [
      'We launch Hong Kong-only first, using parametric insurance structures that do not require claims adjusters. GBA expansion follows regulatory sandbox engagement through HSBC\'s existing Wealth Management Connect framework.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s your data privacy position when using transaction data?',
    answer: [
      'Fully opt-in, with a live transparency dashboard showing customers exactly what triggers what coverage. Designed to be PDPO and CCPA compliant from day one.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'Can this actually be profitable at $20 per micro-event?',
    answer: [
      'Near-zero marginal servicing cost through agentic AI means gross margins exceed 85% at launch, scaling above 90% by Year 3.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What stops HSBC\'s existing insurance partners from feeling cannibalised?',
    answer: [
      'Micro Protection Fluid is additive - it sits alongside existing life policies and is explicitly designed to increase wallet share, not replace core products.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you validate the 90% customer preference claim?',
    answer: [
      'That figure is a projected pilot outcome based on comparable embedded insurance adoption studies - we would present it transparently as a hypothesis to be validated in Phase 1.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How exactly does the AI \'read\' card authorisation data in real time?',
    answer: [
      'When a customer taps their HSBC card, the authorisation request - which includes merchant category code, location, and transaction amount - is processed before settlement. Our system intercepts that signal to trigger coverage reallocation within the same second, before the transaction even clears.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What is a merchant category code and why does it matter?',
    answer: [
      'It is a four-digit code assigned to every merchant by card networks that classifies the type of business. An airline gets a different code than a gym or a restaurant. This lets our AI automatically understand what the customer is doing without them typing anything.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What happens to coverage when someone pays in cash?',
    answer: [
      'Cash transactions produce no card signal, so the AI defaults to the customer\'s established baseline coverage. This is a known limitation we address through supplementary signals like GPS check-ins and calendar data in later phases.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do weather APIs and flight status data actually feed into coverage decisions?',
    answer: [
      'These are secondary triggers. If a typhoon signal is raised in Hong Kong, for example, the system can automatically elevate property and travel delay coverage for all affected customers simultaneously - without individual action required.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How fast is \'sub-second\'? What\'s the actual latency?',
    answer: [
      'Card authorisation windows are typically 1-2 seconds. Our target is to complete reallocation within that window, meaning coverage shifts before the transaction even completes. Exact latency figures will be validated during Phase 1 sandbox testing.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What if two conflicting triggers fire at the same time - say, a gym visit during a typhoon?',
    answer: [
      'The AI applies a priority hierarchy, elevating the highest-risk signal first while maintaining all other floors. Both gym and weather coverage would be elevated simultaneously within their respective ceilings.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you prevent the AI from being gamed - for example, someone briefly triggering an airline code to inflate travel coverage?',
    answer: [
      'Reallocations are tied to actual spending patterns over time, not single transactions. Anomalous spikes trigger a review flag rather than immediate full reallocation. Guardrail floors and ceilings also limit how much any single trigger can shift.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Is this a supervised or unsupervised AI model?',
    answer: [
      'It is a supervised model in Phase 1, operating within human-defined rules and guardrails. Full agentic autonomy is introduced progressively in Phase 3 after regulatory sign-off and pilot validation.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What model architecture powers the reallocation engine?',
    answer: [
      'At this stage we are not prescribing a specific architecture - the focus is on the data pipeline and decision logic. The model selection will be determined during technical build in partnership with HSBC\'s internal AI and data science teams.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How does the system handle merchant code misclassification?',
    answer: [
      'Misclassification is a known industry challenge - roughly 10-15% of merchants carry incorrect codes. Our fallback is baseline coverage, and we layer in supplementary signals to cross-validate. Phase 1 will generate real-world data to refine classification accuracy.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you actually make money at $20 per micro-event?',
    answer: [
      'Near-zero marginal cost per transaction - no agents, no underwriters, no claims adjusters in the loop. The agentic AI handles reallocation automatically, meaning gross margins exceed 85% from launch and scale above 90% by Year 3.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What\'s the revenue model - is it the fixed monthly premium or the micro-boost fees?',
    answer: [
      'Both. The fixed monthly premium is the core recurring revenue stream. Micro-boosts are optional add-ons that generate incremental revenue when customers choose to temporarily elevate coverage beyond their ceiling.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What\'s your customer acquisition cost?',
    answer: [
      'Effectively zero for existing HSBC customers - the product launches as an in-app toggle upgrade, requiring no separate marketing funnel or sales agent. This is one of the strongest commercial advantages of the model.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What is your projected break-even point?',
    answer: [
      'With near-zero marginal cost and a built-in distribution channel of 41 million HSBC customers, break-even is achievable within the first year at even modest adoption rates of 5-8%.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How sensitive is the model to low adoption rates?',
    answer: [
      'Because there is no traditional acquisition cost or underwriting overhead, the model remains viable at low adoption. Even 1% of HSBC\'s Hong Kong retail base represents a meaningful revenue pool.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'Could this cannibalise HSBC Life\'s existing long-term policy revenue?',
    answer: [
      'No - it is explicitly designed to be additive. Micro Protection Fluid targets micro and short-term risk moments that existing policies do not cover. Cross-sell data from comparable embedded products suggests it actually increases uptake of long-term policies by 15-20%.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'Why would HSBC Life take a revenue share risk on unproven AI-driven claims?',
    answer: [
      'The parametric structure of micro-events means payouts are pre-defined and algorithmic - there is no subjective claims assessment. This dramatically reduces loss ratio uncertainty compared to traditional insurance.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What\'s your reinsurance strategy?',
    answer: [
      'We project a 15% saving on reinsurance costs due to smarter, real-time risk segmentation. By accurately matching premiums to actual risk exposure, we reduce the adverse selection problem that drives reinsurance costs up.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you price the floor-and-ceiling guardrails actuarially?',
    answer: [
      'Floors are set conservatively based on historical claims data. Ceilings are calibrated to maximum realistic exposure per category. The AI operates within a pre-validated actuarial range, not in open-ended territory.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What happens financially if a major catastrophic event hits the GBA simultaneously?',
    answer: [
      'All customers\' coverage would elevate simultaneously, creating a correlated claims spike. This is mitigated through reinsurance, the parametric payout structure, and the fact that per-event payouts are capped by ceiling limits.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'Is this product legal under current Hong Kong insurance regulations?',
    answer: [
      'Parametric insurance - where payouts are triggered by predefined events rather than assessed losses - is already permitted under HKIA guidelines. We are launching within this framework first, before seeking broader regulatory approval for the full agentic model.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you get regulatory approval for AI-driven insurance decisions?',
    answer: [
      'We engage HKIA proactively from Phase 1, using the pilot data to build a regulatory evidence base. HSBC\'s existing relationships and Wealth Management Connect sandbox experience give us a credible path to approval.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What happens if a customer disputes an AI-driven coverage decision?',
    answer: [
      'Every reallocation is logged with a full audit trail. Customers can view exactly what triggered each change in their app dashboard, and a human override option is always available. Disputes escalate to HSBC Life\'s standard complaints process.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How does this comply with PDPO - Hong Kong\'s Personal Data Privacy Ordinance?',
    answer: [
      'The product is opt-in only, with granular customer consent controls. Transaction data is processed within HSBC\'s existing data infrastructure, which is already PDPO compliant. No third-party data sharing occurs.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'What about mainland China data regulations - PIPL - for GBA customers?',
    answer: [
      'Cross-border data flow between Hong Kong and mainland China is subject to PIPL. Our GBA expansion strategy uses HSBC\'s existing Wealth Management Connect infrastructure, which has already navigated this regulatory pathway.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'Could regulators shut this down mid-operation?',
    answer: [
      'This is a genuine risk, which is why Phase 1 is Hong Kong-only and uses existing parametric insurance frameworks. We are not waiting for GBA regulatory approval before generating revenue and evidence.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you handle sanctions or compliance screening across GBA jurisdictions?',
    answer: [
      'HSBC\'s existing KYC and compliance infrastructure handles this at the customer level. Micro Protection Fluid sits on top of that infrastructure and inherits those controls automatically.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'Will customers actually trust an AI to manage their insurance coverage?',
    answer: [
      'Trust is built through transparency - the live allocation dashboard shows customers exactly where their premium sits at any moment. The 90-day free trial for premier customers is designed specifically to build this trust before commercial commitment.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What if a customer doesn\'t want AI making these decisions for them?',
    answer: [
      'They can set personal floor preferences that lock certain categories at higher levels, effectively overriding the AI in areas they care about most. Full manual control is always an option.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you handle customers who are not digitally savvy?',
    answer: [
      'HSBC Life agents are incentivised with referral commissions to onboard customers personally. The product is designed to be zero-interaction after setup - which actually makes it more accessible, not less, for less digitally confident users.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What happens if a customer misses a micro-boost notification and ends up underinsured?',
    answer: [
      'Baseline coverage is always maintained - the floor model guarantees this. The micro-boost is an enhancement, not a requirement. Customers are never left with zero coverage in any category.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you communicate coverage changes to customers in real time without overwhelming them?',
    answer: [
      'Notifications are batched and summarised rather than fired for every micro-transaction. The in-app Risk Map gives a live visual overview without requiring customers to read individual alerts.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What happens to coverage during roaming - say, a customer\'s phone is off in Shenzhen?',
    answer: [
      'Coverage reallocation continues based on card authorisation data regardless of phone status. The customer\'s most recently active profile is maintained until new signals arrive.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How does this genuinely address financial inclusion rather than just targeting affluent HSBC customers?',
    answer: [
      'The $20 micro-event price point is deliberately low - far below traditional insurance minimums. The gig and mobile workforce targeted earns $120k-$200k HKD annually, a segment historically underserved by traditional insurers.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'Which specific UN Sustainable Development Goals does this address?',
    answer: [
      'SDG 1.4 - access to financial services and economic resources - and SDG 3.8 - financial protection against health-related risks. Both are directly addressed by closing the protection gap for mobile and gig workers.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you measure ESG impact - what are your metrics?',
    answer: [
      'Key metrics include reduction in underinsurance events, number of gig workers covered for the first time, and reduction in out-of-pocket emergency spending. These will be tracked and reported from Phase 1 onwards.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'Isn\'t AI-driven insurance inherently exclusionary - what about customers with thin spending histories?',
    answer: [
      'New customers default to a conservative balanced baseline rather than a personalised one. As spending history builds over 90 days, the AI progressively personalises allocation. No customer is disadvantaged by a lack of history.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'What is the carbon footprint of running this AI infrastructure at scale?',
    answer: [
      'This is a fair challenge. We would commit to running on HSBC\'s existing cloud infrastructure, which operates under HSBC\'s net-zero commitments, rather than building standalone compute infrastructure.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Why hasn\'t anyone done this before?',
    answer: [
      'The convergence of real-time card authorisation access, agentic AI capability, and regulatory appetite for parametric insurance is genuinely new. Most insurers do not have direct access to card data - HSBC does, which is a structural advantage few competitors can replicate.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What stops a competitor like AXA or AIA from copying this immediately?',
    answer: [
      'The moat is HSBC\'s proprietary transaction data from 41 million customers and the existing app distribution channel. A competitor would need to build equivalent data infrastructure and customer trust from scratch - a multi-year undertaking.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Is HSBC Life the right entity to own this, or should it sit in HSBC\'s banking arm?',
    answer: [
      'It sits at the intersection of both - the banking arm provides the data and distribution, while HSBC Life provides the insurance licence and actuarial framework. A joint ownership model with clear revenue attribution is the most logical structure.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s your exit or scale strategy if this becomes a standalone product?',
    answer: [
      'The product is designed to remain embedded within HSBC\'s ecosystem rather than spun out. Its value compounds within HSBC - increasing customer retention, cross-sell, and data richness - rather than as a standalone entity.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How does this fit into HSBC\'s broader AI strategy?',
    answer: [
      'It is directly aligned with HSBC\'s stated AI strategy of agentic systems operating within human-defined guardrails. It is not a pilot experiment - it is designed as a scalable, production-grade deployment of that strategy.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Could this be white-labelled and sold to other banks or insurers?',
    answer: [
      'Potentially in Phase 4 and beyond. The core engine - real-time card data plus agentic reallocation - is portable to any bank with direct card authorisation access. However, our immediate focus is proving the model within HSBC first.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s your worst-case scenario and how do you survive it?',
    answer: [
      'Regulatory rejection of the GBA expansion. Mitigation: Hong Kong-only parametric insurance generates standalone revenue from day one, meaning the business case holds even without GBA approval.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What if HSBC\'s card authorisation data pipeline goes down?',
    answer: [
      'Fallback to baseline coverage automatically. No customer is ever left uncovered - they simply revert to their standard allocation until the data feed is restored.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What if the AI systematically underestimates risk for a specific customer segment?',
    answer: [
      'Phase 1 manual guardrails and human review catch systemic errors before full agentic deployment. Actuarial review of loss ratios by segment is built into the quarterly operating cadence.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s your liability position if a customer suffers a loss during an AI reallocation error?',
    answer: [
      'The floor model guarantees minimum coverage in every category at all times. Any loss occurring above the floor but below an expected ceiling would be assessed under HSBC Life\'s standard claims process with human review.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What if customers start making decisions specifically designed to game the AI triggers?',
    answer: [
      'Anomaly detection flags unusual patterns for human review. The system is designed to respond to genuine lifestyle signals, not individual transactions in isolation, making gaming significantly harder than it appears.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Who builds this - does HSBC Life have the internal capability?',
    answer: [
      'The core engine leverages HSBC\'s existing card infrastructure and AI teams. Phase 1 requires integration work rather than greenfield build. External partnerships for specific AI components would be evaluated during technical scoping.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s the critical path - what could delay this most?',
    answer: [
      'Regulatory approval for the agentic reallocation model is the longest lead-time item. Everything else - technical build, app integration, customer onboarding - can proceed in parallel.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Why should we trust a student team to have designed something HSBC\'s own teams haven\'t?',
    answer: [
      'We are not claiming to have built it - we\'ve identified the opportunity, validated it against HSBC\'s existing infrastructure, and designed a commercially viable framework. The execution belongs to HSBC\'s teams. Our value is the strategic insight and the blueprint.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What have you assumed that could be wrong?',
    answer: [
      'Three key assumptions: that card authorisation data is accessible in real time at the application layer, that parametric insurance structures will satisfy HKIA requirements, and that 5-8% adoption is achievable in Year 1. All three are validated hypotheses, not confirmed facts, and Phase 1 is designed specifically to test them.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How do you get Didi, Uber, and Trip.com to actually integrate with you?',
    answer: [
      'These partnerships are distribution channels for triggering shields, not data-sharing agreements. The trigger comes from HSBC\'s own card data when a customer pays via these platforms - no formal partnership is required to launch.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s in it for the partners - why would Didi or Trip.com cooperate?',
    answer: [
      'Co-branded micro-insurance shields offer partners a value-added service for their users at zero cost to them. It increases platform stickiness and positions them as customer-centric - a meaningful incentive in competitive GBA markets.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What if a partner platform doesn\'t accept HSBC cards?',
    answer: [
      'The system falls back to baseline coverage. However, HSBC cards have extremely high acceptance rates across GBA platforms, making this an edge case rather than a structural gap.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How did you arrive at $200/month as the fixed premium?',
    answer: [
      'It reflects the mid-range spending profile of our target segment - urban GBA professionals earning $120k-$200k HKD annually. It is positioned competitively against the combined cost of multiple traditional policies covering the same categories.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you set the floors and ceilings actuarially - what data underpins them?',
    answer: [
      'They are calibrated using HSBC\'s historical claims data by customer segment and merchant category. Floors represent the minimum statistically meaningful coverage level; ceilings cap exposure at actuarially defensible maximums.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What\'s your loss ratio assumption and how sensitive is profitability to it?',
    answer: [
      'We project a 20-point improvement in loss ratio versus traditional products, based on Straits Research 2025 data on AI-driven underwriting. A 10-point swing in loss ratio would reduce Year 1 revenue by approximately 15% - still profitable.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you handle adverse selection - won\'t higher-risk customers opt in disproportionately?',
    answer: [
      'The fixed premium structure means customers cannot select into higher coverage - the AI determines allocation, not the customer. This structurally reduces adverse selection compared to traditional voluntary top-up products.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'What currency risk exists for GBA customers paying in RMB versus HKD?',
    answer: [
      'Premiums are denominated in HKD for Hong Kong customers. Cross-border RMB pricing for mainland GBA customers will be determined during Phase 2 in consultation with HSBC\'s treasury and FX teams.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'Who owns the insights derived from customer spending behaviour - HSBC or the customer?',
    answer: [
      'HSBC owns the data infrastructure; customers own their personal data under PDPO. Insights derived at an aggregate level belong to HSBC. Individual-level insights are used solely to power that customer\'s own coverage - never sold or shared.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'Could this data be used against customers - for example, to deny future coverage based on lifestyle?',
    answer: [
      'Explicitly prohibited by design. The data is used solely for real-time reallocation within a fixed premium - not for underwriting decisions, policy renewals, or coverage denial. This distinction is critical and must be communicated clearly to customers.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'What algorithmic bias risks exist - could certain demographics be systematically under-covered?',
    answer: [
      'A genuine risk. If historical spending data reflects existing inequalities - for example, lower card usage among older demographics - the AI could perpetuate those gaps. We mitigate this through regular bias audits by customer segment and conservative default baselines for thin-data profiles.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'How do you ensure the AI remains explainable to regulators - not just a black box?',
    answer: [
      'Every reallocation decision is logged with the specific trigger, merchant code, and allocation change. Regulators can audit the full decision trail. We are committed to explainable AI as a non-negotiable design principle, not an afterthought.',
    ],
    tags: ['privacy'],
  },
  {
    question: 'Will customers actually feel insured if they can\'t see a policy document?',
    answer: [
      'This is a real psychological barrier. The in-app Risk Map is designed specifically to make coverage feel tangible and visible - showing live allocation in colour is more intuitive than a policy document most customers never read.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What happens when a customer has a bad claims experience - how does that affect trust in the whole AI model?',
    answer: [
      'A single bad experience could disproportionately damage trust in AI-driven insurance. This is why Phase 1 maintains human claims oversight, and why the transparency dashboard is central - customers need to understand why a decision was made before they accept it.',
    ],
    tags: ['payouts'],
  },
  {
    question: 'How do you handle customers who are emotionally attached to traditional insurance as a symbol of security?',
    answer: [
      'We do not replace traditional policies - we sit alongside them. The messaging is additive: "your existing coverage stays, this just fills the gaps dynamically." This reduces the psychological barrier to adoption significantly.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What about customers who travel internationally outside the GBA - does coverage follow them?',
    answer: [
      'Phase 1 covers Hong Kong and GBA. International travel triggers the baseline travel coverage floor. Full international extension is a Phase 3 feature, dependent on regulatory sign-off in each jurisdiction.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Are there any existing products globally that resemble this - and what can we learn from their failures?',
    answer: [
      'Lemonade and Metromile in the US have pioneered AI-driven and usage-based insurance respectively. Metromile was acquired by Lemonade in 2022 partly due to thin margins on pure pay-per-mile models. Our fixed premium structure avoids this margin vulnerability while retaining the personalisation benefit.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What about embedded insurance players like Cover Genius or Bolttech - are they competitors?',
    answer: [
      'They are distribution-layer competitors, not product competitors. They embed third-party insurance into platforms. Our model keeps HSBC as both insurer and distributor, which preserves margin and customer relationship ownership - a fundamentally different and stronger position.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Could a BigTech player like Alibaba or Tencent replicate this faster using their own payment data?',
    answer: [
      'Theoretically yes - Alipay and WeChat Pay have comparable transaction data. However, they lack insurance licences in Hong Kong and face significant regulatory barriers. HSBC\'s licensed, regulated position is a structural advantage BigTech cannot shortcut.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Where does this product go in five to ten years?',
    answer: [
      'The long-term vision is a fully autonomous insurance layer embedded in everyday life - invisible, automatic, and perfectly matched to individual risk at every moment. Phase 3 is the foundation; the ten-year horizon is an industry-wide shift away from annual policy cycles entirely.',
    ],
    tags: ['tech'],
  },
  {
    question: 'Could Micro Protection Fluid eventually replace traditional life insurance products?',
    answer: [
      'No - and that is intentional. Life insurance addresses long-term accumulation and mortality risk, which requires permanence and long-term commitment. Micro Protection Fluid addresses short-term, dynamic risk moments. They are complementary, not substitutable.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What does success look like in three years - beyond the financial metrics?',
    answer: [
      'A generation of GBA customers who have never filed a claim they were not covered for, because their insurance moved before the risk did. That behavioural shift - from reactive to proactive protection - is the real measure of success.',
    ],
    tags: ['tech'],
  },
  {
    question: 'If this works in GBA, which market do you expand to next and why?',
    answer: [
      'Southeast Asia - specifically Singapore, Indonesia, and Vietnam - where gig economy penetration is high, insurance penetration is low, and HSBC has existing retail banking infrastructure. The same card authorisation model is directly portable.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What does the competitive landscape look like if every major bank copies this model in three years?',
    answer: [
      'First-mover advantage compounds through data. Three years of real-world reallocation data trains a significantly more accurate model than any competitor starting from scratch. The product improves faster than competitors can catch up.',
    ],
    tags: ['tech'],
  },
  {
    question: 'How did your team come up with this idea - what was the insight moment?',
    answer: [
      'Be ready with a genuine, human story here. Judges respond to authenticity. If there is a real moment of frustration with static insurance in the team\'s personal experience, lead with that.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What would you do differently if you had another month to develop this?',
    answer: [
      'A strong answer shows intellectual honesty. Consider: deeper actuarial modelling of the floor-and-ceiling system, primary customer research with actual GBA gig workers, and a technical feasibility session with HSBC\'s card infrastructure team.',
    ],
    tags: ['tech'],
  },
  {
    question: 'If HSBC gave you $1 million tomorrow to start, what\'s the first thing you spend it on?',
    answer: [
      'Regulatory counsel and a technical feasibility audit of the card authorisation data pipeline - because those are the two longest lead-time items and everything else depends on them.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What\'s the one thing that could kill this idea entirely?',
    answer: [
      'If HSBC\'s card authorisation data is not accessible at the application layer in real time, the core trigger mechanism does not work. That is the single most critical technical assumption to validate before any other work proceeds.',
    ],
    tags: ['tech'],
  },
  {
    question: 'What feedback have you received on this idea that made you rethink something?',
    answer: [
      'Shows coachability and intellectual rigour - two qualities senior judges at this level actively look for. Be honest about a real assumption you reconsidered during development.',
    ],
    tags: ['tech'],
  },
];
