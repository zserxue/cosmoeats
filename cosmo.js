(function() {
  var id = '__blank_ui_panel__';
  var overlayId = '__blank_ui_overlay__';
  var styleId = '__blank_ui_style__';
  var existing = document.getElementById(id);

  function closeAll() {
    var o = document.getElementById(overlayId);
    if (!o) return;
    var panel = document.getElementById(id);
    var wrapper = document.getElementById('__cosmo_wrapper__');
    o.style.background = 'rgba(0,0,0,0)';
    o.style.pointerEvents = 'none';
    if (panel) {
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(80px)';
    }
    if (wrapper) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(80px)';
    }
    setTimeout(function() {
      o.remove();
      var s = document.getElementById(styleId);
      if (s) s.remove();
    }, 400);
  }

  if (existing) {
    closeAll();
    return;
  }

  var style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes __dotBounce__ {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }
    @keyframes __confettiFall__ {
      0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; }
    }
    @keyframes __slideDown__ {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes __borderFlow__ {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes __glowPulse__ {
      0%, 100% { box-shadow: 0 0 30px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.04); }
      50% { box-shadow: 0 0 50px rgba(255,255,255,0.15), 0 0 100px rgba(255,255,255,0.08); }
    }
  `;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = overlayId;
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0);
    z-index: 2147483646;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s ease;
  `;

  var wrapper = document.createElement('div');
  wrapper.id = '__cosmo_wrapper__';
  wrapper.style.cssText = `
    position: relative;
    padding: 2.5px;
    border-radius: 20px;
    background: linear-gradient(135deg, #ffffff, #e0e0e0, #ffffff, #e0e0e0, #ffffff);
    background-size: 300% 300%;
    animation: __borderFlow__ 5s ease-in-out infinite, __glowPulse__ 2.5s ease-in-out infinite;
    opacity: 0;
    transform: translateY(80px);
    transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.05);
  `;

  var el = document.createElement('div');
  el.id = id;
  el.style.cssText = `
    width: 600px;
    max-width: 92vw;
    height: 520px;
    max-height: 85vh;
    background: #1c1c1e;
    border-radius: 18px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
    pointer-events: auto;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
  `;

  wrapper.appendChild(el);
  overlay.appendChild(wrapper);
  document.body.appendChild(overlay);

  var loader = document.createElement('div');
  loader.style.cssText = `
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: 10;
  `;
  var dotsContainer = document.createElement('div');
  dotsContainer.style.cssText = 'display: flex; gap: 10px;';
  for (var i = 0; i < 3; i++) {
    var dot = document.createElement('div');
    dot.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      animation: __dotBounce__ 1.1s ease-in-out infinite;
      animation-delay: ${i * 0.15}s;
    `;
    dotsContainer.appendChild(dot);
  }
  var loadingText = document.createElement('div');
  loadingText.textContent = 'Loading your cart...';
  loadingText.style.cssText = 'color: #9a9a9e; font-size: 14px;';
  loader.appendChild(dotsContainer);
  loader.appendChild(loadingText);

  var content = document.createElement('div');
  content.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    flex-direction: column;
  `;

  var header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 0 24px;
    flex-shrink: 0;
  `;

  var closeBtn = document.createElement('div');
  closeBtn.textContent = 'X';
  closeBtn.style.cssText = `
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #aaa;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  `;
  closeBtn.addEventListener('mouseenter', function() {
    closeBtn.style.background = 'rgba(255,255,255,0.1)';
    closeBtn.style.color = '#fff';
  });
  closeBtn.addEventListener('mouseleave', function() {
    closeBtn.style.background = 'transparent';
    closeBtn.style.color = '#aaa';
  });
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeAll();
  });

  var titleEl = document.createElement('div');
  titleEl.textContent = 'Cosmo Eats';
  titleEl.style.cssText = `
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #f5f5f7;
    text-align: left;
    line-height: 28px;
  `;

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  var storeHeader = document.createElement('div');
  storeHeader.style.cssText = `
    display: none;
    align-items: center;
    gap: 14px;
    padding: 12px 24px 8px 24px;
    flex-shrink: 0;
  `;
  var storeImg = document.createElement('img');
  storeImg.style.cssText = `
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: cover;
    background: #2a2a2e;
    flex-shrink: 0;
  `;
  var storeInfo = document.createElement('div');
  storeInfo.style.cssText = 'display: flex; flex-direction: column;';
  var storeNameEl = document.createElement('div');
  storeNameEl.style.cssText = 'color: #f5f5f7; font-size: 16px; font-weight: 600;';
  var storeSub = document.createElement('div');
  storeSub.style.cssText = 'color: #8e8e93; font-size: 12px;';
  storeInfo.appendChild(storeNameEl);
  storeInfo.appendChild(storeSub);
  storeHeader.appendChild(storeImg);
  storeHeader.appendChild(storeInfo);

  // Address section
  var addressContainer = document.createElement('div');
  addressContainer.style.cssText = `
    display: none;
    padding: 4px 24px 8px 24px;
    flex-shrink: 0;
  `;
  var addressLabel = document.createElement('div');
  addressLabel.textContent = 'Delivery Address';
  addressLabel.style.cssText = 'color: #8e8e93; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;';
  var addressText = document.createElement('div');
  addressText.style.cssText = 'color: #d0d0d4; font-size: 13px;';
  addressContainer.appendChild(addressLabel);
  addressContainer.appendChild(addressText);

  var itemsContainer = document.createElement('div');
  itemsContainer.style.cssText = `
    flex: 1;
    overflow-y: auto;
    padding: 8px 24px 12px 24px;
    margin: 0;
  `;
  itemsContainer.innerHTML = '<div style="color:#9a9a9e;text-align:center;padding:20px 0;">No items in cart</div>';

  var codeContainer = document.createElement('div');
  codeContainer.style.cssText = `
    display: none;
    padding: 10px 24px 14px 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  `;
  var codeLabel = document.createElement('div');
  codeLabel.style.cssText = 'color: #8e8e93; font-size: 11px; text-align: center; margin-bottom: 6px; letter-spacing: 0.5px;';
  codeLabel.textContent = 'CART CODE';
  var codeRow = document.createElement('div');
  codeRow.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: 12px;';
  var codeDisplay = document.createElement('div');
  codeDisplay.style.cssText = `
    font: 22px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    letter-spacing: 4px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 8px 18px;
    color: #f5f5f7;
    user-select: all;
    font-weight: 500;
  `;
  var copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';
  copyBtn.style.cssText = `
    padding: 6px 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    color: #8e8e93;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  `;
  copyBtn.addEventListener('mouseenter', function() {
    copyBtn.style.background = 'rgba(255,255,255,0.12)';
    copyBtn.style.color = '#f5f5f7';
  });
  copyBtn.addEventListener('mouseleave', function() {
    copyBtn.style.background = 'rgba(255,255,255,0.06)';
    copyBtn.style.color = '#8e8e93';
  });
  codeRow.appendChild(codeDisplay);
  codeRow.appendChild(copyBtn);
  codeContainer.appendChild(codeLabel);
  codeContainer.appendChild(codeRow);

  var errorDisplay = document.createElement('div');
  errorDisplay.style.cssText = `
    display: none;
    margin: 12px 24px 16px 24px;
    padding: 16px 20px;
    background: rgba(255, 94, 94, 0.12);
    border: 1px solid rgba(255, 94, 94, 0.3);
    border-radius: 12px;
    animation: __slideDown__ 0.3s ease-out;
    flex-shrink: 0;
  `;
  var errorTitle = document.createElement('div');
  errorTitle.textContent = 'Error Loading Cart';
  errorTitle.style.cssText = 'color: #ff5e5e; font-weight: 600; font-size: 15px; margin-bottom: 4px;';
  var errorMessage = document.createElement('div');
  errorMessage.style.cssText = 'color: #d0d0d4; font-size: 13px; line-height: 1.5;';
  var errorRetryBtn = document.createElement('button');
  errorRetryBtn.textContent = 'Try Again';
  errorRetryBtn.style.cssText = `
    margin-top: 12px;
    padding: 8px 20px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    color: #f5f5f7;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
  `;
  errorRetryBtn.addEventListener('mouseenter', function() {
    errorRetryBtn.style.background = 'rgba(255,255,255,0.15)';
  });
  errorRetryBtn.addEventListener('mouseleave', function() {
    errorRetryBtn.style.background = 'rgba(255,255,255,0.08)';
  });
  errorDisplay.appendChild(errorTitle);
  errorDisplay.appendChild(errorMessage);
  errorDisplay.appendChild(errorRetryBtn);

  content.appendChild(header);
  content.appendChild(storeHeader);
  content.appendChild(addressContainer);
  content.appendChild(errorDisplay);
  content.appendChild(itemsContainer);
  content.appendChild(codeContainer);

  el.appendChild(loader);
  el.appendChild(content);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      overlay.style.background = 'rgba(0,0,0,0.55)';
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    });
  });

  function generateCode() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function formatPrice(amount) {
    if (amount == null) return '$0.00';
    return '$' + Number(amount).toFixed(2);
  }

  function formatAddress(address) {
    if (!address) return '';
    var parts = [];
    if (address.street_number) parts.push(address.street_number);
    if (address.street_name) parts.push(address.street_name);
    if (address.address_short_name) parts.push(address.address_short_name);
    if (address.unit_number || address.unit_number_or_company) {
      parts.push('#' + (address.unit_number || address.unit_number_or_company));
    }
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zip_code) parts.push(address.zip_code);
    if (address.county) parts.push(address.county);
    return parts.join(' ').trim() || 'No address found';
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    ta.remove();
    return Promise.resolve();
  }

  function getItemQuantity(item) {
    var qty = 1;
    if (item && typeof item === 'object') {
      var possibleQtyFields = ['quantity', 'item_quantity', 'qty', 'count', 'selected_quantity', 'total_quantity', 'amount'];
      for (var i = 0; i < possibleQtyFields.length; i++) {
        var val = item[possibleQtyFields[i]];
        if (val !== undefined && val !== null) {
          var num = parseInt(val);
          if (!isNaN(num) && num > 0) {
            qty = num;
            break;
          }
        }
      }
      var subItem = item.menu_item || item.bundle_item || item.item;
      if (subItem && typeof subItem === 'object') {
        for (var j = 0; j < possibleQtyFields.length; j++) {
          var val2 = subItem[possibleQtyFields[j]];
          if (val2 !== undefined && val2 !== null) {
            var num2 = parseInt(val2);
            if (!isNaN(num2) && num2 > 0) {
              qty = num2;
              break;
            }
          }
        }
      }
    }
    return qty;
  }

  function getItemPrice(item) {
    var price = 0;
    if (item && typeof item === 'object') {
      var possiblePriceFields = ['expected_subtotal', 'subtotal', 'total_price', 'price', 'item_price', 'unit_price', 'line_total'];
      for (var i = 0; i < possiblePriceFields.length; i++) {
        var val = item[possiblePriceFields[i]];
        if (val !== undefined && val !== null && val !== '') {
          var num = parseFloat(String(val).replace(/[^0-9.\-]/g, ''));
          if (!isNaN(num) && num !== 0) {
            price = num;
            break;
          }
        }
      }
      var subItem = item.menu_item || item.bundle_item || item.item;
      if (subItem && typeof subItem === 'object') {
        for (var j = 0; j < possiblePriceFields.length; j++) {
          var val2 = subItem[possiblePriceFields[j]];
          if (val2 !== undefined && val2 !== null && val2 !== '') {
            var num2 = parseFloat(String(val2).replace(/[^0-9.\-]/g, ''));
            if (!isNaN(num2) && num2 !== 0) {
              price = num2;
              break;
            }
          }
        }
      }
    }
    return price;
  }

  function mergeItems(items) {
    var merged = {};
    
    items.forEach(function(item) {
      var name = item.name || item.item_name || item.menu_item_name || 'Unknown item';
      var qty = getItemQuantity(item);
      var price = getItemPrice(item);
      var options = item.options || [];
      var choices = item.choices || [];
      
      var optionsKey = '';
      if (options && options.length) {
        optionsKey = JSON.stringify(options);
      }
      if (choices && choices.length) {
        optionsKey += JSON.stringify(choices);
      }
      var key = name + '|' + optionsKey;
      
      if (merged[key]) {
        merged[key].quantity += qty;
        if (merged[key].price === 0 && price > 0) {
          merged[key].price = price;
        }
      } else {
        merged[key] = {
          name: name,
          quantity: qty,
          price: price,
          expected_subtotal: price,
          options: options || [],
          choices: choices || []
        };
      }
    });
    
    var result = [];
    for (var key in merged) {
      if (merged.hasOwnProperty(key)) {
        result.push(merged[key]);
      }
    }
    return result;
  }

  function renderCartItems(items, storeName, reportedTotal, cartCode, storeImage, address) {
    errorDisplay.style.display = 'none';
    itemsContainer.style.display = 'block';

    // Show address if available
    if (address) {
      addressContainer.style.display = 'block';
      var addressStr = formatAddress(address);
      addressText.textContent = addressStr;
    } else {
      addressContainer.style.display = 'none';
    }

    if (!items || items.length === 0) {
      itemsContainer.innerHTML = '<div style="color:#9a9a9e;text-align:center;padding:20px 0;">Your cart is empty</div>';
      codeContainer.style.display = 'none';
      storeHeader.style.display = 'none';
      return;
    }

    var mergedItems = mergeItems(items);

    if (storeName) {
      storeHeader.style.display = 'flex';
      storeNameEl.textContent = storeName;
      storeSub.textContent = mergedItems.length + ' item' + (mergedItems.length > 1 ? 's' : '');
      if (storeImage) {
        storeImg.src = storeImage;
        storeImg.style.display = 'block';
      } else {
        storeImg.style.display = 'none';
      }
    } else {
      storeHeader.style.display = 'none';
    }

    var html = '';
    var total = 0;
    var anyItemHasPrice = false;

    mergedItems.forEach(function(item, index) {
      var name = item.name || 'Unknown item';
      var qty = item.quantity || 1;
      var price = item.price || item.expected_subtotal || 0;
      if (price === 0 && reportedTotal > 0 && mergedItems.length === 1) {
        price = reportedTotal / qty;
      }
      if (price > 0) anyItemHasPrice = true;
      var itemTotal = price * qty;
      total += itemTotal;

      var options = '';
      if (item.options && Array.isArray(item.options) && item.options.length) {
        options = '<div style="color:#7a7a7e;font-size:12px;padding-left:4px;">' +
          item.options.map(function(o) { return '- ' + (typeof o === 'string' ? o : o.name || o.label || JSON.stringify(o)); }).join('<br>') +
          '</div>';
      }
      if (item.choices && Array.isArray(item.choices) && item.choices.length) {
        item.choices.forEach(function(choice) {
          if (choice.values && Array.isArray(choice.values)) {
            choice.values.forEach(function(val) {
              if (val.name) {
                options += '<div style="color:#7a7a7e;font-size:12px;padding-left:4px;">- ' + val.name + '</div>';
              }
            });
          }
        });
      }

      var bgColor = index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)';
      html += `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 8px;border-bottom:1px solid rgba(255,255,255,0.06);background:${bgColor};border-radius:6px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:15px;color:#f5f5f7;font-weight:500;">${qty}x ${name}</div>
            ${options}
          </div>
          <div style="color:#f5f5f7;font-weight:500;flex-shrink:0;padding-left:12px;">${formatPrice(itemTotal)}</div>
        </div>
      `;
    });

    var displayTotal = total > 0 ? total : reportedTotal;
    var usingFallbackTotal = !anyItemHasPrice && reportedTotal > 0;

    if (usingFallbackTotal && mergedItems.length > 1) {
      displayTotal = reportedTotal;
    }

    if (displayTotal < 20) {
      showError('Cart subtotal must be at least $20.00 to generate a code. Current total: ' + formatPrice(displayTotal));
      codeContainer.style.display = 'none';
      return;
    }

    html += `
      <div style="display:flex;justify-content:space-between;padding:14px 8px 6px 8px;border-top:2px solid rgba(255,255,255,0.15);margin-top:4px;">
        <div style="color:#f5f5f7;font-size:17px;font-weight:700;">${usingFallbackTotal ? 'Subtotal' : 'Total'}</div>
        <div style="color:#f5f5f7;font-size:17px;font-weight:700;">${formatPrice(displayTotal)}</div>
      </div>
      <div style="color:#6a6a6e;font-size:12px;text-align:right;padding:4px 8px 0 8px;">${mergedItems.length} item${mergedItems.length > 1 ? 's' : ''}${usingFallbackTotal ? ' — per-item prices unavailable' : ''}</div>
    `;

    itemsContainer.innerHTML = html;

    if (cartCode) {
      codeContainer.style.display = 'block';
      codeDisplay.textContent = cartCode;
      copyBtn.onclick = function() {
        copyToClipboard(cartCode).then(function() {
          copyBtn.textContent = 'Copied!';
          setTimeout(function() { copyBtn.textContent = 'Copy'; }, 1200);
        }).catch(function() {
          var ta = document.createElement('textarea');
          ta.value = cartCode;
          ta.style.cssText = 'position:fixed;left:-9999px;top:0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          try { document.execCommand('copy'); } catch(e) {}
          ta.remove();
          copyBtn.textContent = 'Copied!';
          setTimeout(function() { copyBtn.textContent = 'Copy'; }, 1200);
        });
      };
    } else {
      codeContainer.style.display = 'none';
    }
  }

  function showError(message) {
    loader.style.display = 'none';
    content.style.opacity = '1';
    itemsContainer.style.display = 'none';
    codeContainer.style.display = 'none';
    storeHeader.style.display = 'none';
    addressContainer.style.display = 'none';
    errorDisplay.style.display = 'block';
    errorMessage.textContent = message || 'Could not load your cart. Make sure you are on wonder.com with items in your cart.';
    errorRetryBtn.onclick = function() {
      errorDisplay.style.display = 'none';
      itemsContainer.style.display = 'block';
      itemsContainer.innerHTML = '<div style="color:#9a9a9e;text-align:center;padding:20px 0;">Retrying...</div>';
      codeContainer.style.display = 'none';
      storeHeader.style.display = 'none';
      addressContainer.style.display = 'none';
      loader.style.display = 'flex';
      loader.style.opacity = '1';
      content.style.opacity = '0';
      setTimeout(function() { grabCart(); }, 500);
    };
  }

  function grabCart() {
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    content.style.opacity = '0';
    errorDisplay.style.display = 'none';
    itemsContainer.style.display = 'block';
    codeContainer.style.display = 'none';
    storeHeader.style.display = 'none';
    addressContainer.style.display = 'none';

    var settled = false;

    var resultHandler = function(e) {
      if (settled) return;
      settled = true;
      window.removeEventListener('__wonder_cart_result__', resultHandler);

      var result = e.detail;

      loader.style.opacity = '0';
      setTimeout(function() {
        loader.style.display = 'none';
        content.style.opacity = '1';

        if (result && result.success && result.items) {
          var cartCode = generateCode();
          var storeImage = result.storeImage || null;
          var address = result.address || null;
          renderCartItems(result.items, result.storeName, result.total || 0, cartCode, storeImage, address);
          try {
            var panelRect = el.getBoundingClientRect();
            fireConfetti(panelRect.width / 2, panelRect.height / 2);
          } catch(err) {}
        } else {
          showError(result && result.error ? result.error : 'Could not load your cart. Make sure you are on wonder.com with items in your cart.');
        }
      }, 400);
    };

    window.addEventListener('__wonder_cart_result__', resultHandler);

    var script = document.createElement('script');
    script.textContent = `
      (function() {
        var B = "https://cg.wonderfulbot.org";
        var HMAC_KEY_B64 = "NmMyZWI5MjQtY2ZmMi00MTVkLWEyZGUtYmU5ZmZlZTE5NTEyCg==";
        var HOST = "www.wonder.com";

        function requestId() {
          var c = typeof crypto !== "undefined" ? crypto : null;
          if (c && typeof c.randomUUID === "function") return c.randomUUID();
          var bytes = new Uint8Array(16);
          if (c && c.getRandomValues) c.getRandomValues(bytes);
          else for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
          bytes[6] = (bytes[6] & 15) | 64;
          bytes[8] = (bytes[8] & 63) | 128;
          var hex = [];
          for (var j = 0; j < bytes.length; j++) hex.push((bytes[j] + 256).toString(16).slice(1));
          return hex.slice(0, 4).join("") + "-" + hex.slice(4, 6).join("") + "-" + hex.slice(6, 8).join("") + "-" + hex.slice(8, 10).join("") + "-" + hex.slice(10).join("");
        }

        async function hmac(method, path, ts, params) {
          var d = [], k = Object.keys(params || {}).sort();
          for (var i = 0; i < k.length; i++) {
            d.push(encodeURIComponent(k[i]) + "=" + encodeURIComponent(params[k[i]]));
          }
          var qs = d.join("&");
          var msg = method.toLowerCase() + "\\n" + HOST + "\\n" + path + "\\n" + ts;
          if (qs) msg += "\\n" + qs;
          var kb = Uint8Array.from(atob(HMAC_KEY_B64), function(c) { return c.charCodeAt(0); });
          var ck = await crypto.subtle.importKey("raw", kb, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
          var sig = await crypto.subtle.sign("HMAC", ck, new TextEncoder().encode(msg));
          var b = "";
          new Uint8Array(sig).forEach(function(x) { b += String.fromCharCode(x); });
          return btoa(b);
        }

        function moneyAmount(v) {
          if (v == null || v === "") return null;
          if (typeof v === "number") {
            var n = Math.abs(v) >= 100 ? v / 100 : v;
            return Math.round(n * 100) / 100;
          }
          var p = Number(String(v).replace(/[$,]/g, "").trim());
          return isFinite(p) ? Math.round(p * 100) / 100 : null;
        }

        function subtotalFromSources() {
          var keys = ["expected_subtotal", "formatted_subtotal", "subtotal", "line_subtotal", "formatted_line_subtotal", "item_subtotal", "formatted_item_subtotal", "total_price", "formatted_total_price", "price_of_total_quantity", "priceOfTotalQuantity", "subtotal_cents", "total_cents"];
          for (var s = 0; s < arguments.length; s++) {
            var src = arguments[s];
            if (!src || typeof src !== "object") continue;
            for (var i = 0; i < keys.length; i++) {
              var amount = moneyAmount(src[keys[i]]);
              if (amount != null) return amount;
            }
          }
          return null;
        }

        function checkoutSubtotal(data) {
          return subtotalFromSources(data && data.price_summary, data);
        }

        function extractAddressFromState(state) {
          try {
            var fulfillment = (state.app || {}).fulfillment || {};
            var address = fulfillment.address || {};
            if (address.street_number || address.address_short_name || address.city) {
              return address;
            }
            var cart = (state.app || {}).cart || {};
            var cartData = cart.cartData || {};
            if (cartData.address) {
              return cartData.address;
            }
            return null;
          } catch(e) {
            return null;
          }
        }

        async function fetchCheckout() {
          var ts = Date.now();
          var h = await hmac("GET", "/order/ajax/checkout", ts, {});
          var r = await fetch("/order/ajax/checkout", {
            credentials: "include",
            headers: {
              "x-hmac": h,
              "x-timestamp": String(ts),
              "x-request-id": requestId()
            }
          });
          return await r.json();
        }

        async function fetchCartBanner() {
          var ts = Date.now();
          var h = await hmac("GET", "/order/ajax/cart/banner", ts, {});
          var r = await fetch("/order/ajax/cart/banner", {
            credentials: "include",
            headers: {
              "x-hmac": h,
              "x-timestamp": String(ts),
              "x-request-id": requestId()
            }
          });
          return await r.json();
        }

        async function fetchMenu(storeId) {
          var p = { service_fee_user_variant: "VARIANT_A", time_zone: "America/New_York" };
          var ts = Date.now();
          var h = await hmac("GET", "/order/ajax/restaurant/" + storeId, ts, p);
          var r = await fetch("/order/ajax/restaurant/" + storeId + "?" + Object.keys(p).map(function(k) { return k + "=" + encodeURIComponent(p[k]); }).join("&"), {
            credentials: "include",
            headers: {
              "x-hmac": h,
              "x-timestamp": String(ts),
              "x-request-id": requestId()
            }
          });
          return await r.json();
        }

        async function fetchStoreImage(storeId) {
          try {
            var ts = Date.now();
            var h = await hmac("GET", "/order/ajax/restaurant/" + storeId, ts, { service_fee_user_variant: "VARIANT_A", time_zone: "America/New_York" });
            var r = await fetch("/order/ajax/restaurant/" + storeId + "?service_fee_user_variant=VARIANT_A&time_zone=America/New_York", {
              credentials: "include",
              headers: {
                "x-hmac": h,
                "x-timestamp": String(ts),
                "x-request-id": requestId()
              }
            });
            var data = await r.json();
            var imageUrl = data.restaurant_info && data.restaurant_info.image_url ? data.restaurant_info.image_url : null;
            return imageUrl;
          } catch(e) {
            return null;
          }
        }

        // Try to get address from Redux store
        function getAddressFromRedux() {
          try {
            var els = document.querySelectorAll('body *');
            for (var j = 0; j < els.length; j++) {
              var keys = Object.keys(els[j]);
              for (var k = 0; k < keys.length; k++) {
                if (keys[k].startsWith('__reactFiber$')) {
                  var fiber = els[j][keys[k]];
                  var d = 0;
                  while (fiber && d < 300) {
                    var p = fiber.memoizedProps;
                    if (p && p.value && p.value.store && typeof p.value.store.getState === 'function') {
                      var state = p.value.store.getState();
                      var address = extractAddressFromState(state);
                      if (address) return address;
                    }
                    fiber = fiber.return;
                    d++;
                  }
                }
              }
            }
            return null;
          } catch(e) {
            return null;
          }
        }

        async function grabWithHMAC() {
          var diag = { steps: [] };
          try {
            var co = await fetchCheckout();
            diag.steps.push({ step: "fetchCheckout", status: "ok" });

            var views = (co.cart_restaurants || []).concat(co.restaurant_views || []);
            if (!views || !views.length) {
              window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                detail: { success: false, error: "No cart found" }
              }));
              return;
            }

            var v = views[0];
            var storeId = v.restaurant_id;
            var items = [];
            var citems = (v.checkout_items || []).concat(v.cart_items || [], v.items || []);

            citems.forEach(function(i) {
              if (i.menu_item || i.bundle_item || i.item) {
                var mi = i.menu_item || i.bundle_item || i.item || {};
                var name = mi.menu_item_name || mi.bundle_item_name || mi.item_name || mi.name || '';
                var quantity = i.quantity || i.item_quantity || i.qty || 1;
                var price = subtotalFromSources(i, mi) || i.subtotal || i.total_price || 0;
                var options = i.options || [];
                var choices = i.choices || i.selected_choices || [];
                items.push({
                  name: name,
                  quantity: parseInt(quantity) || 1,
                  price: parseFloat(price) || 0,
                  expected_subtotal: parseFloat(price) || 0,
                  options: options,
                  choices: choices
                });
              }
            });

            var storeName = (v.restaurant_name_view || {}).name || (v.restaurant_name_view || {}).nickname || "";
            var total = checkoutSubtotal(co) || 0;
            var storeImage = null;
            if (storeId) {
              try {
                storeImage = await fetchStoreImage(storeId);
              } catch(e) {}
            }

            // Try to get address from the checkout data first
            var address = co.address || null;
            if (!address || Object.keys(address).length === 0) {
              // Try from Redux store
              address = getAddressFromRedux();
            }

            if (items.length) {
              window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                detail: { success: true, items: items, storeName: storeName, total: total, storeImage: storeImage, address: address }
              }));
              return;
            }

            var banner = await fetchCartBanner();
            var bannerViews = (banner.cart_restaurants || []).concat(banner.restaurant_views || []);
            if (bannerViews && bannerViews.length) {
              var bv = bannerViews[0];
              var bItems = [];
              var bCitems = (bv.checkout_items || []).concat(bv.cart_items || [], bv.items || []);
              bCitems.forEach(function(i) {
                if (i.menu_item || i.bundle_item || i.item) {
                  var mi = i.menu_item || i.bundle_item || i.item || {};
                  var name = mi.menu_item_name || mi.bundle_item_name || mi.item_name || mi.name || '';
                  var quantity = i.quantity || i.item_quantity || i.qty || 1;
                  var price = subtotalFromSources(i, mi) || i.subtotal || i.total_price || 0;
                  var options = i.options || [];
                  var choices = i.choices || i.selected_choices || [];
                  bItems.push({
                    name: name,
                    quantity: parseInt(quantity) || 1,
                    price: parseFloat(price) || 0,
                    expected_subtotal: parseFloat(price) || 0,
                    options: options,
                    choices: choices
                  });
                }
              });
              if (bItems.length) {
                var storeName2 = (bv.restaurant_name_view || {}).name || (bv.restaurant_name_view || {}).nickname || "";
                var storeImage2 = null;
                if (bv.restaurant_id) {
                  try {
                    storeImage2 = await fetchStoreImage(bv.restaurant_id);
                  } catch(e) {}
                }
                // Try to get address from banner data
                var address2 = banner.address || null;
                if (!address2 || Object.keys(address2).length === 0) {
                  address2 = getAddressFromRedux();
                }
                window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                  detail: { success: true, items: bItems, storeName: storeName2, total: banner.subtotal || 0, storeImage: storeImage2, address: address2 }
                }));
                return;
              }
            }

            window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
              detail: { success: false, error: "No items found in cart" }
            }));
          } catch(e) {
            window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
              detail: { success: false, error: e.message || "Error fetching cart" }
            }));
          }
        }

        grabWithHMAC();

        setTimeout(function() {
          if (window.__wonder_hmac_finished) return;
          window.__wonder_hmac_finished = true;

          try {
            var wonderGrabber = null;
            if (typeof window.WonderCartGate !== "undefined" && window.WonderCartGate.Client) {
              try {
                if (typeof window.__WONDER_GRAB_RESULT__ !== "undefined") {
                  wonderGrabber = window.__WONDER_GRAB_RESULT__;
                }
              } catch(e) {}
            }

            if (wonderGrabber && wonderGrabber.success && wonderGrabber.cart) {
              var cart = wonderGrabber.cart;
              var items = cart.items || [];
              var storeName = cart.store_name || "";
              var address = cart.address || null;
              window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                detail: { success: true, items: items, storeName: storeName, total: cart.expected_subtotal || 0, storeImage: null, address: address }
              }));
              return;
            }

            if (typeof window.grab === "function") {
              var result = window.grab();
              if (result && result.success && result.cart) {
                var cart = result.cart;
                var items = cart.items || [];
                var storeName = cart.store_name || "";
                var address = cart.address || null;
                window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                  detail: { success: true, items: items, storeName: storeName, total: cart.expected_subtotal || 0, storeImage: null, address: address }
                }));
                return;
              }
            }

            if (typeof window.grabAndUpload === "function") {
              var result = window.grabAndUpload();
              if (result && result.success && result.cart) {
                var cart = result.cart;
                var items = cart.items || [];
                var storeName = cart.store_name || "";
                var address = cart.address || null;
                window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                  detail: { success: true, items: items, storeName: storeName, total: cart.expected_subtotal || 0, storeImage: null, address: address }
                }));
                return;
              }
            }

            function extractVisibleCartItems() {
              function isVisible(n) {
                if (!n || !(n instanceof Element)) return false;
                var style = getComputedStyle(n);
                var rect = n.getBoundingClientRect();
                return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0" && rect.width > 0 && rect.height > 0;
              }

              function isLeafTextElement(n) {
                if (!isVisible(n)) return false;
                var text = (n.textContent || "").trim();
                if (!text) return false;
                for (var i = 0; i < n.children.length; i++) {
                  if ((n.children[i].textContent || "").trim()) return false;
                }
                return true;
              }

              var pricePattern = /^\\$\\s?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$/;
              var qtyPattern = /^\\d{1,2}$/;

              var allNodes = document.querySelectorAll("div, span, p, li, a, button");
              var leaves = [];
              for (var i = 0; i < allNodes.length; i++) {
                if (isLeafTextElement(allNodes[i])) {
                  leaves.push({ el: allNodes[i], text: (allNodes[i].textContent || "").trim() });
                }
              }

              var priceLeaves = leaves.filter(function(l) { return pricePattern.test(l.text); });
              var usedRows = [];
              var items = [];

              priceLeaves.forEach(function(priceLeaf) {
                var row = priceLeaf.el.parentElement;
                var depth = 0;
                while (row && depth < 8) {
                  if (row.querySelector("img")) break;
                  row = row.parentElement;
                  depth++;
                }
                if (!row || usedRows.indexOf(row) >= 0) return;
                usedRows.push(row);

                var rowLeaves = leaves.filter(function(l) { return row.contains(l.el); });

                var qtyIndex = -1;
                for (var r = 0; r < rowLeaves.length; r++) {
                  if (rowLeaves[r].el !== priceLeaf.el && qtyPattern.test(rowLeaves[r].text)) {
                    qtyIndex = r;
                    break;
                  }
                }
                var quantity = qtyIndex >= 0 ? (parseInt(rowLeaves[qtyIndex].text, 10) || 1) : 1;

                var descriptive = [];
                for (var d = 0; d < rowLeaves.length; d++) {
                  if (d === qtyIndex) continue;
                  if (rowLeaves[d].el === priceLeaf.el) continue;
                  var t = rowLeaves[d].text;
                  if (!t || /^(add items?|remove|delete)$/i.test(t)) continue;
                  descriptive.push(t);
                }

                var name = descriptive[0] || "Item";
                var options = descriptive.slice(1);
                var price = parseFloat(priceLeaf.text.replace(/[^0-9.]/g, "")) || 0;

                items.push({
                  name: name,
                  quantity: quantity,
                  price: price,
                  expected_subtotal: price,
                  options: options,
                  choices: []
                });
              });

              return items;
            }

            var visibleItems = extractVisibleCartItems();
            if (visibleItems.length) {
              var address = getAddressFromRedux();
              window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
                detail: { success: true, items: visibleItems, storeName: "", total: 0, storeImage: null, address: address }
              }));
              return;
            }

            window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
              detail: { success: false, error: "No cart data found after all attempts" }
            }));
          } catch(e) {
            window.dispatchEvent(new CustomEvent("__wonder_cart_result__", {
              detail: { success: false, error: e.message || "Fallback error" }
            }));
          }
        }, 3000);
      })();
    `;
    document.head.appendChild(script);
    script.remove();

    setTimeout(function() {
      if (!settled) {
        settled = true;
        window.removeEventListener('__wonder_cart_result__', resultHandler);
        loader.style.opacity = '0';
        setTimeout(function() {
          loader.style.display = 'none';
          content.style.opacity = '1';
          showError('Request timed out after 30 seconds. Please refresh the page and try again.');
        }, 400);
      }
    }, 30000);
  }

  // Confetti function
  var colors = ['#ff5e5e', '#ffbe4c', '#4cd97b', '#4ca6ff', '#b26cff', '#ff6cd9'];
  function fireConfetti(cx, cy) {
    for (var k = 0; k < 40; k++) {
      var piece = document.createElement('div');
      var size = Math.random() * 6 + 4;
      var angle = Math.random() * Math.PI * 2;
      var dist = Math.random() * 180 + 60;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist - Math.random() * 120 - 40;
      var rot = (Math.random() * 720 - 360) + 'deg';

      piece.style.cssText = `
        position: absolute;
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size * 0.4}px;
        background: ${colors[k % colors.length]};
        border-radius: 2px;
        pointer-events: none;
        z-index: 5;
        --dx: ${dx}px;
        --dy: ${dy}px;
        --rot: ${rot};
        animation: __confettiFall__ ${0.8 + Math.random() * 0.6}s ease-out forwards;
      `;
      el.appendChild(piece);
      (function(p) {
        setTimeout(function() { p.remove(); }, 1500);
      })(piece);
    }
  }

  grabCart();
})();
