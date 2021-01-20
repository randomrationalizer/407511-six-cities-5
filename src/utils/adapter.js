import {extend} from "../utils/common";


export const adaptUserInfoToClient = (userInfo) => {
  const adaptedUserInfo = extend(userInfo, {
    avatarUrl: userInfo.avatar_url,
    isPro: userInfo.is_pro
  });

  delete adaptedUserInfo.avatar_url;
  delete adaptedUserInfo.is_pro;

  return adaptedUserInfo;
};

export const adaptOfferToClient = (offer) => {
  const adaptedOffer = extend(offer, {
    host: adaptUserInfoToClient(offer.host),
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    guestsCount: offer.max_adults,
    previewImage: offer.preview_image,
  });

  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptReviewToClient = (review) => {
  const adaptedReview = extend(review, {
    user: adaptUserInfoToClient(review.user)
  });

  return adaptedReview;
};
