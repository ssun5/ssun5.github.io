---
title: Post 0
---

# Meow 

some math reference things, \\(y=m x+ b\\), math stuffs

$$
block math
$$

\begin{equation}\label{complex}
e^{\pi i} + 1 = 0
\end{equation}

\begin{equation}
E = mc^2
\label{eq:einstein}
\end{equation}

refer to eqn \ref{eq:einstein}

{% for post in collections.post %}
    123
  <h2>{{ post.data.title }}</h2>
{% endfor %}

{% set items = [
  { image: '/assets/img/test_image.png', title: 'Flexible Robotic Tentacle', caption: 'Caption for test image 1. Should show an image of a robotic tentacle.' },
  { image: '/assets/img/test_image.png', title: 'Flexible Robotic Tentacle', caption: 'Caption for test image 1. Should show an image of a robotic tentacle.' }
] %}

{% from "cards.njk" import render_cards %}
{{ render_cards(items) | safe }}

**md strong**
<b>html bold</b>
*md em*
<i>html italic</i>


