import type { Rarity } from "../types";
import legendaryArtwork from "../assets/images/LEGENDARY.png";
import epicArtwork from "../assets/images/EPIC.png";
import rareArtwork from "../assets/images/RARE.png";
import uncommonArtwork from "../assets/images/UNCOMMON.png";
import commonArtwork from "../assets/images/COMMON.png";
import starterArtwork from "../assets/images/STARTER.png";

export const rarityArtwork: Record<Rarity, string> = {
    LEGENDARY: legendaryArtwork,
    EPIC: epicArtwork,
    RARE: rareArtwork,
    UNCOMMON: uncommonArtwork,
    COMMON: commonArtwork,
    STARTER: starterArtwork,
};
