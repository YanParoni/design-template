import { PlatformInfo } from "./platform"

interface EsrbRating {
    id: number
    slug: string
    name: string
}


export class Game {
    id!: number
    slug!: string
    name!: string
    released!: Date
    tba!: boolean
    background_image!: string
    rating!: number
    rating_top!: number
    ratings: any
    ratings_count!: number
    reviews_text_count!: string
    added!: number
    added_by_status!: any
    metacritic!: number
    playtime!: number
    suggestions_count!: number
    updated!: Date
    esrb_rating!: EsrbRating | null
    platforms!: PlatformInfo[]
}
