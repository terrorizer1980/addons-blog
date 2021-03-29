/* global document, navigator, fetch */
(function addonCards(document, navigator) {
  document.querySelectorAll('.StaticAddonCard').forEach(async (card) => {
    const { addonId } = card.dataset;

    if (!addonId) {
      return;
    }

    try {
      const response = await fetch(
        `https://addons.mozilla.org/api/v5/addons/addon/${addonId}/`
      );

      if (!response.ok) {
        throw new Error('add-on not found');
      }

      if (navigator.userAgent.indexOf('Firefox')) {
        // eslint-disable-next-line no-console
        console.log(`Updating button for addonId=${addonId}`);

        const button = card.querySelector('.AddonFirefoxButton');

        if (button) {
          const { current_version } = await response.json();

          button.classList.remove('Button--confirm');
          button.classList.add('Button--action');
          button.innerText = 'Add to Firefox';
          button.setAttribute('href', current_version.files[0].url);
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Failed to fetch addonId=${addonId}: ${e.message || e}`);
      card.remove();
    }
  });
})(document, navigator);
