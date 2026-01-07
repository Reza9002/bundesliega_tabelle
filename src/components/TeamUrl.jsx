import React, { useEffect, useState } from 'react';

export default function TeamUrl({ favoriteTeam }) {
    if (favoriteTeam) {
        const url = new URL(window.location.href);
        url.searchParams.set('team', favoriteTeam);
        window.history.replaceState({}, '', url);
      }
}
