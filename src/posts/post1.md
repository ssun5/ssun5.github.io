---
title: Bifurcation & Chaos
tags: ["control theory","matlab"]

---
<p>
  The infinite sum
  <math display="block">
    <mrow>
      <munderover>
        <mo>∑</mo>
        <mrow>
          <mi>n</mi>
          <mo>=</mo>
          <mn>1</mn>
        </mrow>
        <mrow>
          <mo>+</mo>
          <mn>∞</mn>
        </mrow>
      </munderover>
      <mfrac>
        <mn>1</mn>
        <msup>
          <mi>n</mi>
          <mn>2</mn>
        </msup>
      </mfrac>
    </mrow>
  </math>
  is equal to the real number
  <math display="inline">
    <mfrac>
      <msup>
        <mi>π</mi>
        <mn>2</mn>
      </msup>
      <mn>6</mn>
    </mfrac>
  </math>
  .
</p>
<div class="mathjax_ignore">
{% set items = [
  { image: '/assets/img/test_image.png', title: 'Logistic map', caption: 'Phase portrait / visualization (example)' },
  { image: '/assets/img/test_image2.png', title: 'Bifurcation diagram', caption: 'Bifurcation illustration (placeholder)' },
  { image: '/assets/img/test_image3.png', caption: 'The quick brown fox jumped over your mom. and your mom was not amused.' }
] %}

{% from "cards.njk" import render_cards %}
{{ render_cards(items) }}
</div>




