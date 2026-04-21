---
title: Post 0
---
<h1 class="mt-0 pt-0 about_title">{{ title }}</h1>
# Meow 

some math reference things, \\(y=m x+ b\\), math stuffs

$$
block math
$$

{% set contents = {image: '/assets/img/test_image.png', title: 'Labeled image', callouts: [ { title: 'title 1', label: 'callout label 1', x:50, y:50 }, { title: 'title 2',label: "callout label 2. here's some text to fill the box, see how it all plays together. code is getting cheap. is this the right way to do things?", x:0, y:0 }, { title: 'title 3', label: 'callout label 3', x:30, y:80 } ]
} %}
{% from "img_callout.njk" import render_callout %}
{{ render_callout(contents) | safe }}

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


