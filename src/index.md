---
layout: "base.njk"
title: Home Page
eleventyImport:
  collections: ["post"]
---
Hello! My name is **Shan-Wei Sun** and here you can check out some my projects. Please enjoy. 

This website is under active development.

# Recent Works

{% set items = [
  { image: '/assets/img/cg_walker/x1_orbit_fine.png', title: 'Bipedal Compass-Gait Walker', caption: 'A MATLAB simulation of a passive compass-gait walker on an incline, using Lagrangian/Newton–Euler dynamics and a simple impact model. This project explores how gait evolves into periodic orbits, bifurcations, and chaos as the slope parameter varies.', url: '/posts/cg_walker'},
  { image: '/assets/img/tetris/tetris_cover.jpg', title: 'Autonomous Tetris Agent', caption: 'In this project, I use reinforcement learning techniques to train a computer agent to play the game of Tetris.', url: '/posts/tetris'},
  { image: '/assets/img/opamp/opamp_note1.jpeg', title: 'OpAmp Design & Calculations', caption: 'This post covers the design and calculations for a simple 2-stage operational amplifier.', url: '/posts/opamp'},
  { image: '/assets/img/soft_tracker/device_and_markers.jpg', title: 'Surface Referencing Soft Bodies', caption: 'A low-cost, optical based solution for positional tracking of medical device contact along human skin.', url: '/posts/soft_tracker'},

  
  { image: '/assets/img/test_image.png', title: 'Flexible Robotic Tentacle', caption: 'Caption for test image 1. Should show an image of a robotic tentacle.' },
  { image: '/assets/img/Bent_R_V_Q.jpg', title: 'Modeling of a Thin-Film Resistor', caption: 'Thin-film resistor model showing equipotential lines, current flow, and calculated resistance.' },
  { image: '/assets/img/zs_boards.jpeg', title: 'Look for the Mark', caption: 'Many PCBs I have designed bare my signature. Look around, you might find one!' }
] %}

{% from "cards.njk" import render_cards %}
{{ render_cards(items) | safe }}


<article style="overflow:hidden;">
    <img class="left" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
    <h2>Test Title</h2>
    <p>floating images test. here is a paragraph of stuff to see how the text wraps around the image.</p>

    <p>here is even more text to see how it wraps around the image. hopefully it looks good and not too crazy.</p>
</article>

<article style="overflow:hidden;">
    <img class="right" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
    <h2>Test Title</h2>
    <p>floating images test. here is a paragraph of stuff to see how the text wraps around the image. This image will be on the right side of the text.</p>
</article>

here is even more text to see how it wraps around the image. please behave.

<div class="card-left">
    <div class="img-container bg-blue-500">
        <p>left container</p>
    </div>
    <div class="txt-container bg-red-800">
        <p>right container</p>
    </div>
</div>

<article style="overflow:hidden;">
    <img class="left" src="/assets/img/render_sketch.PNG" alt="render sketch">
    <p>image with some text within an article wrapper. here's some more to fill some space. ABC DEFGHI JKLM NOP QRST UVWXYZ.</p>
</article>

<article style="overflow:hidden;">
    <div class="grid-container left">
        <img class="card-image aspect-square object-cover object-top" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
        <img class="card-image aspect-square object-cover" src="/assets/img/soft_tracker/device_top.jpg" alt="device_view2">
        <img class="card-image aspect-square object-cover object-[25%_25%]" src="/assets/img/soft_tracker/device_and_markers.jpg" alt="device_view3">
        <img class="card-image aspect-square object-cover" src="/assets/img/soft_tracker/measuring_foam_form.jpg" alt="device_view4">
    </div>
    <p>some grid here with images</p>
</article>


<div class="card-container mathjax_ignore">
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover object-top" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
    </div>
  </div>
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover" src="/assets/img/soft_tracker/device_top.jpg" alt="device_view2">
    </div>
  </div>
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover object-[25%_25%]" src="/assets/img/soft_tracker/device_and_markers.jpg" alt="device_view3">
    </div>
  </div>
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover" src="/assets/img/soft_tracker/measuring_foam_form.jpg" alt="device_view4">
    </div>
  </div>
</div>