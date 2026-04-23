---
layout: "base.njk"
title: Home Page
eleventyImport:
  collections: ["post"]
nav: False
---
<div class="wrapper">
<h1>
hi. <br>
i'm <br>
shan-wei.
</h1>
I'm an engineer working on the Internal Tools & Infrastructure Team at Juul Labs, where I build systems that power product research, testing, and formulation.

My passion is designing technology that feel natural. I love spending time outdoors and I strive to bring a human-centric focus to every project. Here you can check out some of the things I'm working on. Please enjoy. 

This website is under active development.
</div>

<div class="w-full">
  <div class="bento">
    <div class="item row-span-2">
      <img class="h-full" src="/assets/img/zs_boards.jpeg" alt="makers_mark">
    </div>
    <div class="item">
      <img class="h-full" src="/assets/img/Bent_R_V_Q.jpg" alt="modeling thin film resistor">
    </div>
    <div class="item row-span-2 col-span-2">
      <img class="h-full" src="/assets/img/cg_walker/x1_orbit_fine.png" alt="Bipedal Compass-Gait Walker">
    </div>
    <div class="grid grid-rows-subgrid grid-cols-subgrid min-h-0 col-span-2 row-span-2 md:row-span-1 md:col-span-4 lg:col-span-2 lg:row-span-2">
      <div class="item">
        <img class="h-full" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
      </div>
      <div class="item">
        <img class="h-full" src="/assets/img/soft_tracker/device_top.jpg" alt="device_view2">
      </div>
      <div class="item">
        <img class="h-full object-[25%_25%]" src="/assets/img/soft_tracker/device_and_markers.jpg" alt="device_view3">
      </div>
      <div class="item">
        <img class="h-full" src="/assets/img/soft_tracker/measuring_foam_form.jpg" alt="device_view4">
      </div>
    </div>
    <div class="item">
      <video class="h-full scale-150" autoplay loop muted>
        <source src="/assets/img/cg_walker/CG_walk_animation.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="item row-span-2">
      <img class="h-full scale-115 origin-[0%_90%]" src="/assets/img/cnc/cnc3.jpeg" alt="cnc">
    </div>
    <div class="item row-span-2 col-span-2">
      <img class="h-full" src="/assets/img/opamp/opamp_note1.jpeg" alt="opamp notes">
    </div>
    <div class="item">
      <img class="h-full scale-120 origin-[10%_40%]" src="/assets/img/mujoco/ur10e.png" alt="ur10e">
    </div>
    <div class="item col-span-2 bg-neutral-900 flex items-center justify-center">
      <img class="object-contain" src="/assets/img/tetris/tetris_pieces.svg" alt="tetris pieces">
    </div>
    <div class="item bg-neutral-900 flex items-center justify-center">
      <img class="object-contain scale-80" src="/assets/img/spread_spectrum/delay_block.svg" alt="SSCLK">
    </div>
    <div class="item">
      <video class="h-full w-full" autoplay loop muted>
        <source src="/assets/img/tetris/tetris.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <!-- <div class="item row-span-2">
      <img class="h-full" src="/assets/img/venturi/resin_printing.jpeg" alt="venturi resin printing">
    </div> -->
  </div>
</div>

# Recent Works

{% set items = [
  { image: '/assets/img/cg_walker/x1_orbit_fine.png', title: 'Bipedal Compass-Gait Walker', caption: 'A MATLAB simulation of a passive compass-gait walker on an incline, using Lagrangian/Newton–Euler dynamics and a simple impact model. This project explores how gait evolves into periodic orbits, bifurcations, and chaos as the slope parameter varies.', url: '/posts/cg_walker'},
  { image: '/assets/img/tetris/tetris_cover.jpg', title: 'Autonomous Tetris Agent', caption: 'In this project, I use reinforcement learning techniques to train a computer agent to play the game of Tetris.', url: '/posts/tetris'},
  { image: '/assets/img/opamp/opamp_note1.jpeg', title: 'OpAmp Design & Calculations', caption: 'This post covers the design and calculations for a simple 2-stage operational amplifier.', url: '/posts/opamp'},
  { image: '/assets/img/soft_tracker/device_and_markers.jpg', title: 'Surface Referencing Soft Bodies', caption: 'A low-cost, optical based solution for positional tracking of medical device contact along human skin.', url: '/posts/soft_tracker'}
] %}

{% from "cards.njk" import render_cards %}
{{ render_cards(items) | safe }}
