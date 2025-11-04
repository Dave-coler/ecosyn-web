// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer({
  currentLang
}) {
  const companyInfo = {
    zh: {
      name: '上海汉势新能源科技有限公司',
      email: 'sales@hill-sea.com / service@hill-sea.com',
      address: '上海市闵行区剑川路955号',
      social: '社交媒体',
      partners: '合作机构'
    },
    en: {
      name: 'Shanghai Hillsea New Energy Technology Co., Ltd.',
      email: 'sales@hill-sea.com / service@hill-sea.com',
      address: '955 Jianchuan Rd, Minhang District, Shanghai, China',
      social: 'Social Media',
      partners: 'Partners'
    }
  };
  const info = companyInfo[currentLang];
  const partners = [{
    name: 'IEA',
    url: 'https://www.iea.org/'
  }, {
    name: 'ICCT',
    url: 'https://theicct.org/'
  }, {
    name: 'SAE-China',
    url: 'https://www.sae-china.org/'
  }, {
    name: 'CAAM',
    url: 'http://www.caam.org.cn/'
  }, {
    name: 'China EV100',
    url: 'https://www.chinaev100.org/'
  }, {
    name: 'Tsinghua Auto',
    url: 'http://www.tsinghua-auto.com/'
  }, {
    name: 'NHVR',
    url: 'https://www.nhvr.gov.au/'
  }, {
    name: 'ATA',
    url: 'https://www.truck.net.au/'
  }, {
    name: 'EVC',
    url: 'https://electricvehiclecouncil.com.au/'
  }];
  return <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] bg-clip-text text-transparent">
              HILLSEA
            </h3>
            <p className="text-gray-300 mb-4">{info.name}</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{info.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{info.address}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{info.social}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#0D7E9C] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#0D7E9C] transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#0D7E9C] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{info.partners}</h4>
            <div className="grid grid-cols-2 gap-2">
              {partners.map((partner, index) => <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-[#0D7E9C] transition-colors">
                  {partner.name}
                </a>)}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HILLSEA. All rights reserved.</p>
        </div>
      </div>
    </footer>;
}