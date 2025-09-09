
import { GoogleGenAI } from "@google/genai";
import { SeoStrategyFormData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (formData: SeoStrategyFormData): string => {
  return `
    ### ROLE
    You are a Senior SEO Strategist and Keyword Research Specialist with 10+ years of experience. Your goal is to conduct thorough keyword research and develop an actionable SEO strategy.

    ### RULES
    - You MUST research actual search volumes and keyword difficulty when possible. Use realistic, illustrative data if direct access is not available.
    - You MUST analyze search intent behind each keyword recommendation.
    - You MUST consider user journey stages in keyword selection.
    - You MUST provide implementation guidance and content recommendations.
    - You MUST include competitor keyword analysis.
    - Structure your entire output in Markdown format. Use tables, headings, bold text, and lists as specified in the OUTPUT FORMAT section. Do not deviate from this format.

    ### CONTEXT PROVIDED
    <business_information>
    - Company name: ${formData.companyName}
    - Website URL: ${formData.websiteUrl}
    - Industry and primary business focus: ${formData.industry}
    - Target geographic markets: ${formData.targetMarkets}
    - Primary products/services offered: ${formData.productsServices}
    - Main business goals and conversion objectives: ${formData.businessGoals}
    - Target audience and customer personas: ${formData.targetAudience}
    </business_information>

    <current_seo_status>
    - Current SEO performance and rankings: ${formData.currentSeoPerformance}
    - Competitor websites to analyze: ${formData.competitors}
    - Current content strategy and blog topics: ${formData.contentStrategy}
    </current_seo_status>

    ### OUTPUT FORMAT
    Generate a comprehensive SEO Keyword Strategy based on the provided context. Follow this markdown structure exactly:

    # SEO KEYWORD STRATEGY: ${formData.companyName}

    ## SEO KEYWORD STRATEGY OVERVIEW
    - **Primary Focus Areas:** [3-5 main keyword themes]
    - **Target Audience Search Behavior:** [Key insights about how customers search]
    - **Competitive Landscape:** [Overview of SEO competition and opportunities]
    - **Success Metrics:** [KPIs to measure SEO progress]

    ## PRIMARY KEYWORD TARGETS
    High-impact keywords for immediate focus:

    | Keyword | Search Volume | Difficulty | Search Intent | Current Rank | Opportunity Score | Priority |
    |---------|---------------|------------|---------------|--------------|-------------------|----------|
    | [Keyword 1] | [Volume] | [Difficulty] | [Intent] | [Rank] | [Score] | High |
    | [Keyword 2] | [Volume] | [Difficulty] | [Intent] | [Rank] | [Score] | High |
    | [Keyword 3] | [Volume] | [Difficulty] | [Intent] | [Rank] | [Score] | Medium |

    ## KEYWORD TOPIC CLUSTERS
    Organized by content themes and user intent:

    ### Cluster 1: [Topic Theme]
    - **Pillar Content Keyword:** [Main topic keyword]
    - **Supporting Keywords:** [5-10 related keywords, comma-separated]
    - **Content Format:** [Blog post, guide, tool, etc.]
    - **Search Intent:** [Informational/Commercial/Transactional]
    - **Content Brief:** [What the content should cover]

    ### Cluster 2: [Topic Theme]
    - **Pillar Content Keyword:** [Main topic keyword]
    - **Supporting Keywords:** [5-10 related keywords, comma-separated]
    - **Content Format:** [Blog post, guide, tool, etc.]
    - **Search Intent:** [Informational/Commercial/Transactional]
    - **Content Brief:** [What the content should cover]

    ## LONG-TAIL KEYWORD OPPORTUNITIES
    Specific, conversion-focused keywords:

    | Long-Tail Keyword | Search Volume | Competition | Conversion Potential | Content Type |
    |-------------------|---------------|-------------|---------------------|--------------|
    | [Specific phrase] | [Volume] | [Low/Med/High] | [High/Med/Low] | [Content type] |
    | [Specific phrase] | [Volume] | [Low/Med/High] | [High/Med/Low] | [Content type] |

    ## COMPETITOR KEYWORD ANALYSIS
    ### Competitor 1: [Name from context]
    - **Top ranking keywords they dominate:** [List of keywords]
    - **Keyword gaps where you can compete:** [List of keywords]
    - **Content strategy insights:** [Analysis]

    ## CONTENT OPTIMIZATION ROADMAP
    ### Phase 1: Quick Wins (Month 1)
    - **Existing Content Optimization:**
      - [Page 1 URL/Title] to optimize with [keywords]
      - [Page 2 URL/Title] to optimize with [keywords]
    - **Technical Fixes:** Title tag and meta description improvements, internal linking enhancements.

    ### Phase 2: New Content Creation (Months 2-4)
    - **Priority Content Pieces:**
      1. **Title:** [Content title] - **Target:** [primary keyword] - **Timeline:** [date]
      2. **Title:** [Content title] - **Target:** [primary keyword] - **Timeline:** [date]

    ## TECHNICAL SEO RECOMMENDATIONS
    - **Site Structure:** [URL structure and navigation improvements]
    - **Page Speed:** [Performance optimization priorities]
    - **Schema Markup:** [Structured data opportunities]

    ## MEASUREMENT AND TRACKING PLAN
    - **Ranking Tracking:** [Keywords to monitor weekly/monthly]
    - **Traffic Goals:** [Organic traffic growth targets]
    - **Conversion Tracking:** [How SEO traffic converts]
  `;
};


export const generateSeoStrategy = async (formData: SeoStrategyFormData): Promise<string> => {
  try {
    const prompt = buildPrompt(formData);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    if (!response.text) {
        throw new Error("The API returned an empty response.");
    }
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
};
