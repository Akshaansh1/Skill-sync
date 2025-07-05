export interface Skill {
    id: number;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Expert';
    category: string;
    score?: number;
}

export interface RecommendedSkill {
    name: string;
    category: string;
    reason: string;
    tag: 'Recommended' | 'In Demand' | 'Trending';
    difficulty: 'Easy' | 'Medium' | 'Hard';
}