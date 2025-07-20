import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currencyData, setCurrencyData] = useState({
    USD_RUB: { rate: 96.45, change: -1.23, changePercent: -1.26 },
    KRW_RUB: { rate: 0.0724, change: -0.0012, changePercent: -1.63 },
    USD_KRW: { rate: 1332.5, change: 8.2, changePercent: 0.62 }
  });

  const [timeframe, setTimeframe] = useState('1D');

  // Симуляция обновления данных
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrencyData(prev => ({
        USD_RUB: {
          ...prev.USD_RUB,
          rate: prev.USD_RUB.rate + (Math.random() - 0.5) * 0.5,
          change: (Math.random() - 0.5) * 2,
          changePercent: (Math.random() - 0.5) * 3
        },
        KRW_RUB: {
          ...prev.KRW_RUB,
          rate: prev.KRW_RUB.rate + (Math.random() - 0.5) * 0.001,
          change: (Math.random() - 0.5) * 0.002,
          changePercent: (Math.random() - 0.5) * 2
        },
        USD_KRW: {
          ...prev.USD_KRW,
          rate: prev.USD_KRW.rate + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 15,
          changePercent: (Math.random() - 0.5) * 1.5
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: currency === 'KRW_RUB' ? 4 : 2,
      maximumFractionDigits: currency === 'KRW_RUB' ? 4 : 2
    }).format(value);
  };

  const CurrencyCard = ({ pair, data, title }: { 
    pair: string; 
    data: { rate: number; change: number; changePercent: number }; 
    title: string;
  }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 bg-gray-900">
          <div className="text-3xl font-bold text-slate-900">
            {formatCurrency(data.rate, pair)}
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={data.change >= 0 ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              <Icon 
                name={data.change >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={12} 
              />
              {data.change >= 0 ? '+' : ''}{formatCurrency(data.change, pair)}
            </Badge>
            <span className={`text-sm font-medium ${
              data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const generateMockChart = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
      data.push({
        time: i,
        value: 96 + Math.sin(i * 0.5) * 3 + Math.random() * 2
      });
    }
    return data;
  };

  const chartData = generateMockChart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">CurrencyTracker</h1>
                <p className="text-sm text-slate-600">Курсы валют в реальном времени</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Icon name="Wifi" size={12} className="mr-1" />
                Онлайн
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Currency Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Курсы валют</h2>
          <p className="text-slate-600 mb-8">Актуальные котировки основных валютных пар</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CurrencyCard 
              pair="USD_RUB" 
              data={currencyData.USD_RUB} 
              title="USD → RUB" 
            />
            <CurrencyCard 
              pair="KRW_RUB" 
              data={currencyData.KRW_RUB} 
              title="KRW → RUB" 
            />
            <CurrencyCard 
              pair="USD_KRW" 
              data={currencyData.USD_KRW} 
              title="USD → KRW" 
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Графики</h2>
              <p className="text-slate-600">Динамика изменения курсов</p>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className="min-w-[60px]"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={20} className="text-primary" />
                  USD/RUB - {timeframe}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center border border-slate-200">
                  <div className="text-center">
                    <Icon name="TrendingUp" size={48} className="text-primary mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">График USD/RUB</p>
                    <p className="text-sm text-slate-500 mt-2">Интерактивный график за {timeframe}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="LineChart" size={20} className="text-primary" />
                  KRW/RUB - {timeframe}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center border border-slate-200">
                  <div className="text-center">
                    <Icon name="Activity" size={48} className="text-green-600 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">График KRW/RUB</p>
                    <p className="text-sm text-slate-500 mt-2">Интерактивный график за {timeframe}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Analytics Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Аналитика и прогнозы</h2>
          <p className="text-slate-600 mb-8">Экспертные оценки и прогнозы движения курсов</p>
          
          <Tabs defaultValue="forecasts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="forecasts" className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} />
                Прогнозы
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Icon name="BarChart3" size={16} />
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Icon name="Newspaper" size={16} />
                Новости
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="forecasts" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">USD/RUB - Краткосрочный прогноз</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Сопротивление:</span>
                        <span className="font-semibold text-red-600">98.50</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Поддержка:</span>
                        <span className="font-semibold text-green-600">94.20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Цель:</span>
                        <span className="font-semibold text-blue-600">97.00</span>
                      </div>
                      <Badge className="w-full justify-center" variant="outline">
                        Нейтральная тенденция
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">KRW/RUB - Краткосрочный прогноз</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Сопротивление:</span>
                        <span className="font-semibold text-red-600">0.0750</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Поддержка:</span>
                        <span className="font-semibold text-green-600">0.0700</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Цель:</span>
                        <span className="font-semibold text-blue-600">0.0735</span>
                      </div>
                      <Badge className="w-full justify-center" variant="default">
                        Слабо бычья тенденция
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Технический анализ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Icon name="Target" size={32} className="text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-slate-900">RSI Индикатор</h4>
                      <p className="text-2xl font-bold text-blue-600 mt-2">52.4</p>
                      <p className="text-sm text-slate-600">Нейтральная зона</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Icon name="ArrowUpDown" size={32} className="text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-slate-900">MACD</h4>
                      <p className="text-2xl font-bold text-green-600 mt-2">+0.12</p>
                      <p className="text-sm text-slate-600">Бычий сигнал</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Icon name="BarChart" size={32} className="text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-slate-900">Объемы</h4>
                      <p className="text-2xl font-bold text-purple-600 mt-2">142M</p>
                      <p className="text-sm text-slate-600">Высокая активность</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "ЦБ РФ сохранил ключевую ставку на уровне 21%", time: "2 часа назад", impact: "high" },
                  { title: "Банк Кореи снизил базовую ставку до 3.0%", time: "5 часов назад", impact: "medium" },
                  { title: "Рост инфляции в России замедлился до 8.9%", time: "1 день назад", impact: "medium" },
                  { title: "Экспорт Южной Кореи вырос на 7.2%", time: "2 дня назад", impact: "low" }
                ].map((news, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-slate-900 leading-snug">{news.title}</h4>
                          <Badge 
                            variant={news.impact === 'high' ? 'destructive' : news.impact === 'medium' ? 'default' : 'outline'}
                            className="ml-2 shrink-0"
                          >
                            {news.impact === 'high' ? 'Высокое' : news.impact === 'medium' ? 'Среднее' : 'Низкое'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {news.time}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;