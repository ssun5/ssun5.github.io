---
title: Design of Spread Spectrum Clock
date: '2024-06-27'
---

<div>
<div class="img_container center aspect-[4/3] rounded-xl">
<img class="object-cover scale-115 origin-[90%_15%]" src="/assets/img/spread_spectrum/384khz_fft_compare_full.jpg" alt="fft noise comparison">
</div>
<p class="fig_caption text-pretty">Power spectral density: system clock with <span class="text-blue-500">spread spectrum</span> vs. <span class="text-red-400">no spread</span></p>
</div>

# Introduction
*Spread Spectrum Clocking (SSC)* is a technique that helps reduce the radiated emissions of digital systems by modulating and shifting the frequency of clock signals. Due to the periodicity of the digital clock signals, electromagnetic interference (EMI) tends to concentrate about system clock frequencies as well as their odd harmonics. By slightly varying a system's clock freuquency, the overall emission is spread over a broader frequency range, reducing peak EMI and helping systems meet regulatory standards.

# Design Specifications
In this design, I target high-frequency noise reduction in the AM band. The spread spectrum block modulates the input clock by ±5%, ±10%, ±15%, or ±20%, selectable
by the user, and outputs the modulated clock. The input clock (central frequency) may be
384kHz, 480kHz, 576kHz, or 768kHz. The spread spectrum block has access to the master on-chip current reference (2µA).

Additionally, the system must maintain close adherance to a 50% duty cycle.

## Software \& Simulation Tools
The system is designed and simulated with Cadence Virtuoso.

# System Overview
The functional design of this block is based on the circuit presented by Nagari et al.<a href="#ref1"><sup>[1]</sup></a> (see figure below). We can see in this circuit that the master clock is first injected from the left side, and through a sequence of delays, the clock is systematically time-shifted to produce an output clock with varied frequency from one period to the next. Each delay block is structurally similar, with pass-through (no delay) as the top path and delayed signal as the bottom path. Path selection is done via the sequencer. 

<img class="center" src="/assets/img/spread_spectrum/Nagari_ssc.jpg" alt="Nagari SSC">

## Delay Cell
The delay cell is the principle building block about which the rest of the system is designed. Its functional diagram is illustrated here.

{% set contents = {image: '/assets/img/spread_spectrum/delay_block.svg', title: 'Delay block', callouts: [ { title: 'Clock in', label: 'clock signal enters the delay block', x:10, y:00 }, { title: 'Pass-through', label: 'allows the clock signal to pass through the delay block without any delays', x:45, y:00 }, { title: 'Delay line',label: "applies a delay to the incoming clock pulse", x:35, y:65 }]
} %}
{% from "img_callout.njk" import render_callout %}
{{ render_callout(contents) | safe }}

My rendition of spread spectrum clock is shown in here. Looking at the schematic, we can see that the master clock first enters from the left side, and is modulated by blocks **Fine trim DL** and **Coarse trim DL**. **Fine trim DL** and **Coarse trim DL** are functionally similar in that both impose ’jitters’ in frequency relative to the central (input) frequency — one smaller and the other larger in magnitude, respectively. Thus, for the purpose of discussion, we can simply choose one of the two blocks to examine. 

<div>
<div class="img_container center w-full aspect-[3/1] rounded-xl">
<img class="object-cover invert object-[50%_60%]" src="/assets/img/spread_spectrum/DLSS_system_view.jpg" alt="DLSS system">
</div>
<p class="fig_caption text-pretty">DLSS system view</p>
</div>

Figure 4 shows the internal structure of Coarse trim DL. The block is composed of multiple
delay blocks. The delay blocks come in pairs (e.g. MUX delay cell 10n is repeated), as the first cell is responsible for delay of the first half period and the second cell effectively helps double the delay in the latter half period. Together, they ensure that the modulated clock maintains a duty cycle of 50%. See Figure 2 for visualization.

<div class="img_container center w-full rounded-xl">
<img class="object-cover invert object-center" src="/assets/img/spread_spectrum/coarse_trim.jpg" alt="coarse trim block">
</div>


One of the details relating to correct output of the spread spectrum clock is the fact that the delay cells are designed to apply asymmetric delays to the rising and falling edges of the incoming clock signal. This is because applying the same delay to both results in overall unequal $t_{on}$ and $t_{off}$.

Looking at the DLSS schematic (Figure 3), we can see that the master clock first enters from
the left side, and is modulated by blocks Fine trim DL and Coarse trim DL. Fine trim DL and
Coarse trim DL are functionally similar in that both impose ’jitters’ in frequency relative to the
central (input) frequency — one smaller and the other larger in magnitude, respectively. Thus,
for the purpose of discussion, we can simply choose one of the two blocks to examine.
Figure 4 shows the internal structure of Coarse trim DL. The block is composed of multiple
delay blocks. The delay blocks come in pairs (e.g. MUX delay cell 10n is repeated), as the first
cell is responsible for delay of the first half period and the second cell effectively helps double the
delay in the latter half period. Together, they ensure that the modulated clock maintains a duty
cycle of 50%. See Figure 2 for visualization.


<div class="img_container center rounded-xl">
<img class="object-cover object-center" src="/assets/img/spread_spectrum/delay_line_timing.svg" alt="delay line timing">
</div>

<div>
<div class="img_container center w-full rounded-xl">
<img class="object-cover invert object-center" src="/assets/img/spread_spectrum/delay_cell_26n.jpg" alt="26ns delay cell">
</div>
<p class="fig_caption text-pretty">Delay block</p>
</div>

<div>
<div class="img_container center rounded-xl">
<img class="object-cover invert max-h-[60vh] w-auto" src="/assets/img/spread_spectrum/delay_cell_26n_zoom.jpg" alt="linear delay">
</div>
<p class="fig_caption text-pretty">Linear delay element</p>
</div>





<div>
<div class="img_container center w-full aspect-[3/1] rounded-xl">
<img class="object-cover invert scale-100 origin-[100%_40%]" src="/assets/img/spread_spectrum/DLSS_system_view.jpg" alt="DLSS system">
</div>
<p class="fig_caption text-pretty">DLSS system view</p>
</div>



Figure 4 shows the internal structure of Coarse trim DL. The block is composed of multiple delay blocks. The delay blocks come in pairs (e.g. MUX delay cell 10n is repeated), as the first cell is responsible for delay of the first half period and the second cell effectively helps double the delay in the latter half period. Together, they ensure that the modulated clock maintains a duty cycle of 50%. See Figure 2 for visualization. To achieve the activation sequence as seen in Figure 2, we utilize D flip-flops with inverted clock signals (CLK D & CLK Db) such that the second delay block is only activated on the falling edge of the input clock (relative to the delay pair). The delay pairs are enabled sequentially, with the sequence determined by input signal buses Fine trim<1:0> & Coarse trim<2:0>.

some math reference things, \\(y=m x+ b\\), math stuffs

$$
block math
$$

```js
const msg = "hello, world";
console.log(msg);
```


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


# References

<ol class="references">
<li id="ref1">A. Nagari, E. Allier, F. Amiard, V. Binet and C. Fraisse, <em>"An 8 Ω 2.5 W 1%-THD 104 dB(A)-Dynamic-Range Class-D Audio Amplifier With Ultra-Low EMI System and Current Sensing for Speaker Protection,"</em> in IEEE Journal of Solid-State Circuits, vol. 47, no. 12, pp. 3068-3080, Dec. 2012, doi: 10.1109/JSSC.2012.2225762.</li>
</ol>



